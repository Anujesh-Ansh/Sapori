import React, { createContext, useContext, useState, useEffect } from "react";
import {
  auth,
  isFirebaseConfigured,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
} from "../services/firebase";
import { LOYALTY_TIERS, DEFAULT_GUEST_USER } from "../data/loyaltyData";

const AuthContext = createContext(null);

const STORAGE_KEY = "sapori_club_member_session";

// Helper to determine tier based on points
export function calculateTier(points) {
  if (points >= 2500) return "eccellenza";
  if (points >= 1000) return "riserva";
  return "classico";
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch (e) {
      console.error("Failed to parse saved session", e);
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // If Firebase is configured, listen to auth state changes
  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          setUser((prev) => {
            if (prev && prev.id === fbUser.uid) return prev;
            const newMember = {
              id: fbUser.uid,
              name: fbUser.displayName || (fbUser.isAnonymous ? "Guest Member" : "Club Member"),
              email: fbUser.email || "guest@saporiditalia.in",
              phone: fbUser.phoneNumber || "+91 98101 24567",
              isGuest: fbUser.isAnonymous,
              tier: "classico",
              points: 500,
              memberNumber: `SAP-${fbUser.uid.substring(0, 4).toUpperCase()}-26`,
              joinedDate: "October 2026",
              dietaryPreference: "Vegetarian",
              preferredTable: "Atrium Window View",
              anniversaryDate: "14 February",
              rewards: [],
              history: [
                {
                  id: `hist-${Date.now()}`,
                  date: "Today",
                  title: "Club Privilegio Welcome Bonus",
                  type: "earn",
                  points: "+500",
                  category: "Welcome Bonus",
                },
              ],
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newMember));
            return newMember;
          });
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  // Save session changes to localStorage
  const saveUserSession = (updatedUser) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Instant Guest Login (Fulfills user requirement for 1-click guest access to rewards & settings)
  const loginAsGuest = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.warn("Firebase anonymous auth failed, falling back to local guest:", err);
        }
      }
      // Populate guest user with rich demo profile and pre-loaded points
      const guestSession = {
        ...DEFAULT_GUEST_USER,
        id: `guest-${Date.now().toString().slice(-4)}`,
        loginTime: new Date().toISOString(),
      };
      saveUserSession(guestSession);
      return { success: true, user: guestSession };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Email / Password Login
  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured && auth) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = userCredential.user;
        const member = {
          id: fbUser.uid,
          name: fbUser.displayName || email.split("@")[0],
          email: fbUser.email,
          phone: "+91 98101 24567",
          isGuest: false,
          tier: "riserva",
          points: 1200,
          memberNumber: `SAP-${fbUser.uid.substring(0, 4).toUpperCase()}-26`,
          joinedDate: "October 2026",
          dietaryPreference: "Eggitarian",
          preferredTable: "Atrium Window View (Table 04)",
          anniversaryDate: "14 February",
          rewards: [
            {
              id: "rew-welcome-500",
              rewardId: "dining_500",
              title: "₹500 Dining Credit Voucher",
              code: "WELCOME500",
              unlockedAt: "1 Oct 2026",
              status: "available",
              pointsCost: 500,
              expiry: "Valid until 31 Dec 2026",
            },
          ],
          history: [
            {
              id: `hist-${Date.now()}`,
              date: "Today",
              title: "Member Sign In",
              type: "earn",
              points: "+50",
              category: "Daily Check-In",
            },
          ],
        };
        saveUserSession(member);
        return { success: true, user: member };
      } else {
        // Local authentic session simulation
        const member = {
          id: `usr-${Date.now().toString().slice(-5)}`,
          name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          email: email.trim(),
          phone: "+91 98101 24567",
          isGuest: false,
          tier: "riserva",
          points: 1200,
          memberNumber: `SAP-${Math.floor(1000 + Math.random() * 9000)}-26`,
          joinedDate: "October 2026",
          dietaryPreference: "Eggitarian",
          preferredTable: "Atrium Window View (Table 04)",
          anniversaryDate: "14 February",
          rewards: [
            {
              id: "rew-welcome-500",
              rewardId: "dining_500",
              title: "₹500 Dining Credit Voucher",
              code: "WELCOME500",
              unlockedAt: "1 Oct 2026",
              status: "available",
              pointsCost: 500,
              expiry: "Valid until 31 Dec 2026",
            },
          ],
          history: [
            {
              id: `hist-welcome`,
              date: "Today",
              title: "Club Privilegio Sign In Bonus",
              type: "earn",
              points: "+100",
              category: "Daily Visit",
            },
          ],
        };
        saveUserSession(member);
        return { success: true, user: member };
      }
    } catch (error) {
      return { success: false, error: error.message || "Failed to sign in. Please verify your credentials." };
    } finally {
      setLoading(false);
    }
  };

  // New Member Sign Up
  const signupWithEmail = async (name, email, password) => {
    setLoading(true);
    try {
      let uid = `usr-${Date.now().toString().slice(-5)}`;
      if (isFirebaseConfigured && auth) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        uid = userCredential.user.uid;
        if (name && auth.currentUser) {
          await firebaseUpdateProfile(auth.currentUser, { displayName: name });
        }
      }

      const newMember = {
        id: uid,
        name: name.trim() || email.split("@")[0],
        email: email.trim(),
        phone: "+91 98101 24567",
        isGuest: false,
        tier: "classico",
        points: 500, // 500 Welcome Bonus Punti
        memberNumber: `SAP-${Math.floor(1000 + Math.random() * 9000)}-26`,
        joinedDate: "October 2026",
        dietaryPreference: "Vegetarian",
        preferredTable: "Atrium Main Dining",
        anniversaryDate: "Not set",
        rewards: [],
        history: [
          {
            id: `hist-signup`,
            date: "Today",
            title: "Enrollment Welcome Bonus",
            type: "earn",
            points: "+500",
            category: "Welcome Gift",
          },
        ],
      };
      saveUserSession(newMember);
      return { success: true, user: newMember };
    } catch (error) {
      return { success: false, error: error.message || "Failed to create account. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  // Update Profile & Preferences
  const updateUserProfile = (updates) => {
    if (!user) return;
    const updated = {
      ...user,
      ...updates,
    };
    saveUserSession(updated);
  };

  // Redeem Reward with Punti
  const redeemReward = (reward) => {
    if (!user) return { success: false, error: "Must be logged in to redeem rewards" };
    if (user.points < reward.pointsCost) {
      return { success: false, error: "Insufficient Sapori Punti for this reward" };
    }

    const newPoints = user.points - reward.pointsCost;
    const newTier = calculateTier(newPoints);
    const voucherCode = `${reward.codePrefix}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRewardItem = {
      id: `rew-${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      code: voucherCode,
      unlockedAt: new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
      status: "available",
      pointsCost: reward.pointsCost,
      expiry: `Valid for ${reward.expiryDays} days`,
    };

    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      date: "Just now",
      title: `Redeemed ${reward.title}`,
      type: "redeem",
      points: `-${reward.pointsCost}`,
      category: reward.category,
    };

    const updatedUser = {
      ...user,
      points: newPoints,
      tier: newTier,
      rewards: [newRewardItem, ...(user.rewards || [])],
      history: [newHistoryEntry, ...(user.history || [])],
    };

    saveUserSession(updatedUser);
    return { success: true, voucher: newRewardItem };
  };

  // Earn Points (e.g. on booking reservation or checking in)
  const earnPoints = (pointsAmount, title = "Dining Visit", category = "Dining Spend") => {
    if (!user) return;
    const newPoints = user.points + pointsAmount;
    const newTier = calculateTier(newPoints);

    const newHistoryEntry = {
      id: `hist-${Date.now()}`,
      date: "Just now",
      title,
      type: "earn",
      points: `+${pointsAmount}`,
      category,
    };

    const updatedUser = {
      ...user,
      points: newPoints,
      tier: newTier,
      history: [newHistoryEntry, ...(user.history || [])],
    };

    saveUserSession(updatedUser);
  };

  // Sign out
  const logout = async () => {
    try {
      if (isFirebaseConfigured && auth) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.warn("Firebase signout error:", e);
    }
    saveUserSession(null);
  };

  const currentTier = user?.tier || "classico";
  const tierInfo = LOYALTY_TIERS[currentTier] || LOYALTY_TIERS.classico;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: Boolean(user),
        isGuest: Boolean(user?.isGuest),
        loading,
        tierInfo,
        tiers: LOYALTY_TIERS,
        loginAsGuest,
        loginWithEmail,
        signupWithEmail,
        updateUserProfile,
        redeemReward,
        earnPoints,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
