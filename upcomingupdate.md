# PetMate - Upcoming Updates & Roadmap (V2)

---

### 1. Dynamic Data Optimization (Replacing Static Content)
* **Real-time Platform Statistics:** Replace hardcoded metrics (`10k+ Pets`, `500+ Reviews`) by fetching real database counts from the backend via Prisma (`prisma.pet.count()`, `prisma.booking.count()`, `prisma.review.count()`)[cite: 18].
* **Dynamic Featured Sitters:** Replace static slide cards on the homepage with an API call fetching top-rated verified sitters dynamically[cite: 18].
* **Dynamic Service Categories:** Fetch active `serviceType` enums and available services directly from database queries instead of using a hardcoded array[cite: 18, 25].
* **Functional Contact Form:** Connect the contact page form to persist messages in a `ContactMessage` table or dispatch direct email alerts using Resend or Nodemailer[cite: 1].

---

### 2. Core Feature Enhancements (V2)
* **Cloudinary Direct Media Uploads:** 
  * Image upload and preview for pet profile registration and editing[cite: 2].
  * Profile avatars and photo galleries for sitter verification and showcase[cite: 2].
* **Payment Gateway Integration:**
  * **Stripe:** Global credit and debit card processing for booking payments.
  * **SSLCommerz / Local Gateways:** Local mobile financial services (bKash, Nagad) and regional cards.
* **In-App Notifications & Transactional Emails:**
  * Real-time notification badge (bell icon) in the navigation bar when booking statuses transition (`CONFIRMED`, `CANCELLED`, `COMPLETED`)[cite: 2, 25].
  * Automated email confirmations, reminders, and payment receipts.
* **Direct 1-on-1 Chat:** Live messaging interface between pet owners and sitters once a booking is confirmed.
* **Sitter Availability Calendar:** Interactive scheduling interface for sitters to block out blackout dates and specify working hours.
* **AI Pet Care Assistant (RAG Chatbot):** Intelligent chat widget using vector embeddings (e.g., pgvector / Pinecone) to answer pet health questions and recommend matching sitters based on unstructured queries[cite: 12].

--- update vercel

### 3. Production Deployment Architecture
* **Frontend:** Deploy Next.js App Router to Vercel with production environment variables[cite: 27].
* **Backend:** Deploy Express/Node.js API to Render or Railway.
* **Database:** Cloud-hosted PostgreSQL instance running on Neon Tech or Supabase[cite: 12, 25].