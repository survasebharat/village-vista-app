08-10-25
# 🌾 **Shivankhed Khurd Village Website – UI & Feature Specification**

> A community web portal to share village announcements, development updates, and local services for Shivankhed Khurd.

---

## 🏠 **1. Home / Scroller Page**

### Layout

* The **Home Page** should have:

  * **70% area** filled with a **village image carousel (slider)**.
  * **20–30% area** reserved for **latest announcements** (scrollable list or ticker).
* On clicking the **village logo**, it must **redirect to the main Home Page**.

### Image Section

* Replace placeholder images with **authentic photos** of the village.
* Images should auto-scroll smoothly (with fade animation).

### Announcements

* Show the **latest announcements** dynamically.
* Scrolling ticker format for visibility.
* “View All Announcements” link → navigates to the full “Notice Board” page.
  VIMP : Notice bord should be added as a new route 

---

## 👥 **2. Members Section**

* Display **member photos** (village representatives, committee members).
* Ensure each member card includes:
  * Name
  * Role / Designation
  * Contact (optional)
---

## 🏛️ **3. Panchayat Staff Directory**

* Dedicated section showing **Panchayat Staff Details**:

  * Lineman
  * Talathi
  * Gramsevak
  * Police Officer
  * Doctor / Health Staff
* Each entry: **Photo, Name, Designation, Contact number**.

---

## 🌟 **4. Sarpanch Details**

* Add a separate block on Home or “About” page:

  * **Sarpanch Photo, Name, Contact**, and a short **message to the villagers**.

---

## 📜 **5. Notice Board (Village Updates)**

* Create a dedicated “Notice Board” or “Village Updates” page.
* Should list all **announcements chronologically**.
* Each update: Title, Date, Short Description.
---

## 📱 **6. Social Media Integration**

* Add footer or header icons with links to:
  * WhatsApp
  * Facebook
  * Instagram
  * Twitter
  * YouTube
  * Arattai

> ⏳ Create official social media pages for all above platforms and share URLs to link.

* **Generate a Shivankhed Khurd village logo** and use it consistently across all platforms and the website.

---

## 🌐 **7. Language Options**

* Add a **language switcher** in the header:(Only for mobile view)
  * **EN (English)**
  * **HI (Hindi)**
  * **M (Marathi)**

---

## 🏡 **8. About Page**

### Content

Include:

* About our village
* List of **Mandirs, Masjids, Lake, Kavil Davakhana**
* Educated and notable people from the village
* Add a **dropdown** for “Village Gallery” options:

  * Ganesh Festival
  * Road Inauguration
  * Health Camp

---

## 🛍️ **9. Services Section**

List local services with photos, contact details, and timings.

**Categories:**

* Ration Shops
* Grocery Shops
* Hotels
* Medicals / Hospitals
* Transportation
* Training Centers
* Farmers
* Plumbers
* Electricians
* Mistris / Contractors
* Pharma Shops

Each entry should include:

* Photo
* Owner Name
* Mobile Number
* Timings
* Short Description

---

## 🏢 **10. Government Schemes & Services**

Add a page or section summarizing:

* PM Awas Yojana
* Hospital Services
* Veterinary Doctor Updates
* Polio / Health News

---

## 🙋‍♂️ **11. Need Help with Panchayat**

* List **all toll-free numbers** with short descriptions.
* Include emergency and helpline numbers (police, hospital, fire, etc.).
---

## 🛠️ **12. Development Work**

### Completed Work

* List completed development projects with:

  * Title
  * Cost
  * Date Completed
  * Image (optional)

### Ongoing Work

* Display ongoing projects such as:

  * Road Construction
  * Beautification Work
  * Street Lighting
  * Community Health Center

### Development Summary

* A section showing **“Yearly Development Summary”**.
  Example:

  > “In 2025, Shivankhed Khurd completed 8 key projects under Panchayat Development Plan.”
        - Display the Modal view to display about the Inprogress, Completed etc.

---

## 🖼️ **13. Village Gallery**

Under “About” → Dropdown → “Gallery”.
Sub-categories:

* Ganesh Festival
* Road Inauguration
* Health Camp
* Cultural Programs
* School Events
* Swachyata Abhiyan 
* dustbean & mediclore distribution  

Each gallery should display images in a grid view (click to expand full image).

---

## 📞 **14. Contact Us**
* Sugesstion Box.
* Update Panchayat Office details (address, contact number, email).
* **Form Submission**:
  * Store contact form submissions in **Google Sheets** (using Apps Script or API).
  * Fields: Name, Mobile, Email, Message.

---

## ⚡ **15. Quick Services Section**

### Examples:

* **Birth Certificate – Apply**

  * On clicking “Apply”, show a popup to display below items : 
    -> Requered docuemtns 
    -> Gov web link to apply 
    -> How to Apply instructions  

  * Add a “Submit” button → save response to Google Sheets.

* Add other forms later (e.g., water connection, income certificate, etc.)

---
* **PWA (Progressive web application)** 
- For Mobile APP


## 🎨 **Design & Look Guidelines**

* Use **village theme colors** (green, saffron, white, earthy tones).
* Maintain **simple and responsive UI**.
* Use clean typography (e.g., Inter, Lato, or Open Sans).
* Header, footer, and nav bar should be consistent across all pages.
* Ensure full **mobile responsiveness**.

---

✅ **Developer Notes:**

* Tech Stack Suggested: React + TailwindCSS (frontend)
* Database: Google Sheets or Firebase (for simple form data)
* Hosting: Vercel (current)
* All external links and assets (social media, forms) must open in new tabs.
