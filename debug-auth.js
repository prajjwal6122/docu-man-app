/**
 * Debug Helper for Docu-Man Authentication
 * Paste this in browser console to check auth status
 */

console.log("🔍 AUTHENTICATION DEBUG INFO 🔍");
console.log("=====================================\n");

// Check Cookies
console.log("📝 COOKIES:");
console.log("Raw cookies:", document.cookie);
const cookies = document.cookie.split(";").reduce((acc, cookie) => {
  const [key, value] = cookie.trim().split("=");
  acc[key] = value;
  return acc;
}, {});
console.log("Parsed cookies:", cookies);
console.log("authToken cookie:", cookies.authToken ? "✅ Found" : "❌ Missing");
console.log("user cookie:", cookies.user ? "✅ Found" : "❌ Missing");
console.log("");

// Check localStorage
console.log("💾 LOCAL STORAGE:");
const authToken = localStorage.getItem("authToken");
const user = localStorage.getItem("user");
console.log(
  "authToken:",
  authToken ? "✅ " + authToken.substring(0, 30) + "..." : "❌ Missing",
);
console.log("user:", user ? "✅ " + user : "❌ Missing");
console.log("");

// Check if authenticated
const isAuthenticated = !!(cookies.authToken || authToken);
console.log(
  "🔐 AUTHENTICATION STATUS:",
  isAuthenticated ? "✅ AUTHENTICATED" : "❌ NOT AUTHENTICATED",
);
console.log("");

// Test API call
if (isAuthenticated) {
  console.log("🧪 Testing API call with token...");
  fetch("https://apis.allsoft.co/api/documentManagement/documentTags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: cookies.authToken || authToken,
    },
    body: JSON.stringify({ term: "" }),
  })
    .then((res) => {
      console.log("API Test Response Status:", res.status);
      if (res.status === 401) {
        console.error("❌ TOKEN INVALID - Got 401 Unauthorized");
      } else if (res.ok) {
        console.log("✅ TOKEN VALID - API call successful");
        return res.json();
      } else {
        console.warn("⚠️ Unexpected status:", res.status);
      }
    })
    .then((data) => {
      if (data) console.log("API Response:", data);
    })
    .catch((err) => console.error("API Test Error:", err));
} else {
  console.log("⚠️ Cannot test API - no auth token found");
}

console.log("\n=====================================");
console.log("💡 TIP: If authenticated but still redirecting,");
console.log("   check the Network tab for 401 responses");
