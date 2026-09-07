# PetMate - Upcoming Updates & Roadmap (V2)[cite: 16]

---

### ১. স্ট্যাটিক পেজ ডাইনামিক করা (Data Dynamic Optimization)
* **Real-time Platform Statistics:** হোমপেজ ও About Us পেজের হার্ডকোডেড কাউন্টার (`Happy Pets`, `Verified Sitters`, `Reviews`) সরিয়ে ব্যাকএন্ড থেকে সরাসরি ডাটাবেজ কাউন্ট ফেচ করা (`prisma.pet.count()`, `prisma.booking.count()`, `prisma.review.count()`)[cite: 11, 16]।
* **Featured Sitters Section:** হোমপেজে স্ট্যাটিক ডাটার বদলে টপ-রেটেড সিটারদের ডায়নামিক কার্ড গ্রিড রেন্ডার করা[cite: 16]।
* **Dynamic Service Categories:** হার্ডকোডেড ক্যাটাগরি অ্যারের পরিবর্তে সিটারদের দেওয়া ইউনিক `serviceType` ব্যাকএন্ড থেকে ফেচ করে ক্যাটাগরি পেজে প্রদর্শন করা।
* **Functional Contact Form:** কন্টাক্ট পেজের ফর্ম সাবমিশন ডাটাবেজের টেবিলে সংরক্ষণ অথবা Resend/Nodemailer দিয়ে ইমেইল নোটিফিকেশন পাঠানো[cite: 11]।

---

### ২. কোর ফিচার এনহ্যান্সমেন্ট (V2 Features)
* **Cloudinary Direct Image Upload:** 
  * পেটের প্রোফাইল ছবি আপলোড ও প্রিভিউ[cite: 11, 18]।
  * সিটারের প্রোফাইল পিকচার ও কাজ করার ফটো গ্যালারি আপলোড[cite: 11, 18]।
* **Payment Gateway Integration:**
  * **Stripe:** আন্তর্জাতিক কার্ড পেমেন্ট প্রসেসিং[cite: 18]।
  * **SSLCommerz:** বিকাশ, নগদ এবং লোকাল কার্ডের মাধ্যমে পেমেন্ট কমপ্লিশন[cite: 18]।
* **In-App Notification & Email Alerts:**
  * বুকিংয়ের স্ট্যাটাস পরিবর্তিত হলে (`CONFIRMED`, `CANCELLED`, `COMPLETED`) ওনার ও সিটারের নেভবারে রিয়েল-টাইম বেল আইকন নোটিফিকেশন[cite: 18]।
  * বুকিং কনফার্মেশন ও ইনভয়েসের স্বয়ংক্রিয় ইমেইল অ্যালার্ট[cite: 18]।
* **In-App Direct Chat:** বুকিং কনফার্ম হওয়ার পর পেট ওনার ও সিটারের মাঝে ওয়ান-টু-ওয়ান লাইভ মেসেজিং[cite: 18]।
* **Sitter Availability Calendar:** সিটারদের নিজস্ব ক্যালেন্ডারে ফ্রি ও ব্যস্ত ডেট ব্লক করার সুযোগ[cite: 18]।
* **AI Pet Care Assistant (RAG Bot):** পোষা প্রাণীর যত্ন, সাধারণ স্বাস্থ্য জিজ্ঞাসা ও স্মার্ট সিটার সুপারিশের জন্য এআই চ্যাটবট ইন্টিগ্রেশন[cite: 18]।

---

### ৩. ডেপ্লয়মেন্ট আর্কিটেকচার (Production Setup)
* **Frontend:** Vercel-এ Next.js App Router ডেপ্লয়মেন্ট ও এনভায়রনমেন্ট ভেরিয়েবল কনফিগারেশন।
* **Backend:** Render বা Railway প্ল্যাটফর্মে Node.js/Express সার্ভার ডেপ্লয়মেন্ট।
* **Database:** Neon Tech অথবা Supabase ক্লাউড PostgreSQL ডাটাবেজ কানেকশন।