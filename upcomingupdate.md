# PetMate - Upcoming Updates & Roadmap (V2)

---

### 1. Dynamic Data Optimization (Replacing Static Content)
* **Real-time Platform Statistics:** Replace hardcoded metrics (`10k+ Pets`, `500+ Reviews`) by fetching real database counts from the backend via Prisma (`prisma.pet.count()`, `prisma.booking.count()`, `prisma.review.count()`)[cite: 1].
* **Dynamic Featured Sitters:** Replace static slide cards on the homepage with an API call fetching top-rated verified sitters dynamically[cite: 1].
* **Dynamic Service Categories:** Fetch active `serviceType` enums and available services directly from database queries instead of using a hardcoded array[cite: 1].
* **Functional Contact Form:** Connect the contact page form to persist messages in a `ContactMessage` table or dispatch direct email alerts using Resend or Nodemailer[cite: 1].

---

### 2. Core Feature Enhancements (V2)
* **Cloudinary Direct Media Uploads:** 
  * Image upload and preview for pet profile registration and editing[cite: 1].
  * Profile avatars and photo galleries for sitter verification and showcase[cite: 1].
* **Payment Gateway Integration:**
  * **Stripe:** Global credit and debit card processing for booking payments[cite: 1, 5].
  * **SSLCommerz / Local Gateways:** Local mobile financial services (bKash, Nagad) and regional cards[cite: 1, 5].
* **In-App Notifications & Transactional Emails:**
  * Real-time notification badge (bell icon) in the navigation bar when booking statuses transition (`CONFIRMED`, `CANCELLED`, `COMPLETED`)[cite: 1].
  * Automated email confirmations, reminders, and payment receipts[cite: 1].
* **Direct 1-on-1 Chat:** Live messaging interface between pet owners and sitters once a booking is confirmed[cite: 1, 5].
* **Sitter Availability Calendar:** Interactive scheduling interface for sitters to block out blackout dates and specify working hours[cite: 1, 5].
* **AI Pet Care Assistant (RAG Chatbot):** Intelligent chat widget using vector embeddings (e.g., pgvector / Pinecone) to answer pet health questions and recommend matching sitters based on unstructured queries[cite: 1, 5].

---

### 3. Production Deployment Architecture
* **Frontend:** Deploy Next.js App Router to Vercel with production environment variables[cite: 1, 6].
* **Backend:** Deploy Express/Node.js API to Vercel (Serverless functions) or Render/Railway[cite: 1, 6].
* **Database:** Cloud-hosted PostgreSQL instance running on Neon Tech[cite: 1, 6].

---

### Quick Update Checklist
1. Dynamic data integration (Stats, categories & featured sitters)[cite: 1]
2. Cloudinary image upload (Pets & sitters)[cite: 1]
3. Payment integration (SSLCommerz & Stripe)[cite: 1, 5]
4. In-app notifications & email alerts[cite: 1]
5. Direct 1-on-1 chat[cite: 1, 5]
6. Sitter availability calendar[cite: 1, 5]
7. AI Pet Care assistant (RAG chatbot)[cite: 1, 5]
8. Functional contact form[cite: 1]