# VIT Pune Semester Result Portal (React Application)

> **Web Technologies Assignment — Lab 04 (Question 4)**  
> **Topic:** Responsive Website to prepare One Semester Result of VIT students using REACT with AI code generation assistance (ChatGPT), featuring four core subjects with MSE Marks (30%) and ESE Marks (70%).

---

## 📌 Problem Statement

> *"4. Design and develop a responsive website to prepare one semester result of VIT students using REACT with the help of any code generation AI tool like ChatGPT, Take any four subjects with MSE Marks (30%) ESE Marks (70%)."*

---

## 🚀 Key Features

1. **Autonomous Institute Evaluation Scheme**:
   - **MSE (Mid Semester Exam)**: 30% Weightage.
   - **ESE (End Semester Exam)**: 70% Weightage.
   - **Total Marks**: 100% per subject.
   - **Two Flexible Input Modes**:
     - *Direct Mode*: MSE entered out of 30, ESE entered out of 70.
     - *Scaled Mode*: MSE entered out of 100 (auto-scaled to 30%), ESE entered out of 100 (auto-scaled to 70%).

2. **Four Core Subjects**:
   - `CS3011` — **Web Technologies** (4 Credits)
   - `CS3012` — **Database Management Systems** (4 Credits)
   - `CS3013` — **Operating Systems** (3 Credits)
   - `CS3014` — **Computer Networks** (3 Credits)
   *(Subject names, codes, and credit hours can also be edited dynamically in the UI)*

3. **VIT Pune 10-Point Absolute Grading Engine**:
   - $Marks \ge 90$: **O** (Outstanding, Grade Point = 10)
   - $80 \le Marks < 90$: **A+** (Excellent, Grade Point = 9)
   - $70 \le Marks < 80$: **A** (Very Good, Grade Point = 8)
   - $60 \le Marks < 70$: **B+** (Good, Grade Point = 7)
   - $50 \le Marks < 60$: **B** (Above Average, Grade Point = 6)
   - $45 \le Marks < 50$: **C** (Average, Grade Point = 5)
   - $40 \le Marks < 45$: **P** (Pass, Grade Point = 4)
   - $Marks < 40$: **F** (Fail, Grade Point = 0)
   - **Passing Rule**: Aggregate $\ge 40\%$ and minimum 40% in ESE.

4. **Academic Calculations**:
   - **Credit Points**: $\text{Course Credits} \times \text{Grade Point}$
   - **SGPA (Semester Grade Point Average)**:
     $$\text{SGPA} = \frac{\sum (\text{Course Credits} \times \text{Grade Point})}{\sum \text{Course Credits}}$$
   - **Overall Percentage**: $\frac{\text{Total Marks Obtained}}{\text{Max Marks (400)}} \times 100$
   - **Class Awarded**: Distinction ($\ge 7.75$ SGPA / $\ge 70\%$), First Class ($\ge 6.75$ / $\ge 60\%$), Higher Second Class, Second Class, Pass Class, or Fail/ATKT.

5. **Official Authentic Marksheet Layout**:
   - VIT Pune official crest and autonomous affiliation header.
   - Candidate bio panel (PRN, Roll No, Mother's Name, Branch, Semester, Academic Year).
   - High-precision tabulated score sheet with watermarked university emblem.
   - Digital verification QR code and official sign-off stamps (Controller of Examinations, Dean Academics).

6. **Responsive & Print-Ready**:
   - Mobile, Tablet, and Desktop responsive layout.
   - Mobile tab switcher (`Marks Entry`, `Official Marksheet`, `Analytics`).
   - One-click **"Print Marksheet / Save PDF"** button with dedicated `@media print` formatting that outputs a clean, official A4 grade sheet.

7. **Interactive Quick Presets**:
   - 🌟 **Distinction Topper** (High scores across all courses)
   - 📘 **First Class Average** (Balanced performance)
   - ⚠️ **ATKT Case** (Backlog scenario to demonstrate 'F' grade & backlog handling)
   - 🔄 **Reset to Defaults**

8. **AI Prompt Documentation Modal**:
   - Built-in documentation modal showing the exact ChatGPT prompt engineering used to design, architect, and verify the solution.

---

## 🛠️ Project Structure

```text
LAB 04/
├── index.html                   # HTML template with Google Fonts (Cinzel, Inter, JetBrains Mono)
├── package.json                 # Dependencies (React 19, Lucide React, Vite)
├── vite.config.js               # Vite bundler configuration
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Main application orchestrator & state manager
│   ├── App.css                  # Modern responsive styling, glassmorphism & print CSS
│   ├── index.css                # Color variables & typographic base
│   ├── utils/
│   │   └── gradeCalculator.js   # Calculation engine (MSE 30%, ESE 70%, SGPA, 10-point scale)
│   └── components/
│       ├── Navbar.jsx           # VIT Header, mode switcher, and utility actions
│       ├── StudentForm.jsx      # Student credentials form, presets, and 4 subject inputs
│       ├── Marksheet.jsx        # Official VIT Pune Semester Grade Sheet component
│       ├── PerformanceChart.jsx # Interactive MSE vs ESE visual comparison & SGPA gauge
│       ├── GradingModal.jsx     # VIT 10-point grading regulations dialog
│       └── AIPromptModal.jsx    # ChatGPT prompt logs & assignment verification matrix
```

---

## ⚡ How to Run the Application

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173/` (or assigned port). Open the URL in your web browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🤖 AI Code Generation Methodology (ChatGPT / AI Prompt Log)

In accordance with the assignment prompt:
> *"with the help of any code generation AI tool like ChatGPT"*

The following iterative prompt pipeline was utilized:
1. **Architectural & State Schema**: Prompted AI for React hooks and data structures to represent 4 subjects with MSE (30%) and ESE (70%) distribution.
2. **Grading Engine Prompt**: Structured the VIT 10-point grading scale, credit points calculation, and edge cases (passing criteria, backlogs/ATKT).
3. **UI/UX & Print CSS Prompt**: Styled an authentic VIT Pune grade report with A4 print layout (`@media print`) and mobile-friendly responsive tabs.

---

## 📄 Marksheet Print / PDF Export
- Click the **"Print Marksheet"** button in the navbar or on top of the marksheet.
- In the browser print dialog:
  - Destination: **Save as PDF**
  - Layout: **Portrait**
  - Paper size: **A4**
  - Options: Enable **Background graphics** for authentic colored badges and borders.
