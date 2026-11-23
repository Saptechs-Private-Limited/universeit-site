(function () {
  "use strict";

  var stage = document.getElementById("stage");
  var topbar = document.getElementById("topbar");
  var bottomDock = document.getElementById("bottom-dock");
  var pageActions = document.getElementById("page-actions");
  var backButton = document.getElementById("back-button");
  var stack = [];
  var current = { id: "welcome", storySection: "connected", menuTopic: "admissions", tourTopic: "mobile", flowChoice: "menu" };
  var selectedRoleId = "founder";
  var instituteRoles = [
    {
      id: "founder", title: "Founder / Director", subtitle: "Institute-wide view",
      dayToDay: "Review money in and out, branch performance, approvals, attendance, curriculum coverage, exam outcomes and family feedback.",
      peacefulDay: "Open one current snapshot for the branch you choose. See receipts and payments, what needs your approval, staff and student attendance, lesson coverage, results and parent feedback—without waiting for someone to assemble a report.",
      helps: [["Branch pulse", "Compare branches and review student and staff attendance, academic coverage, exam results and family feedback."], ["Financial control", "Track fee collections, vendor payments, budgets and classroom cost or profit centres."], ["Approvals that fit", "Keep major decisions under your approval rules while routine work keeps moving."]],
      timeBack: "Spend less time gathering updates; focus on exceptions and decisions."
    },
    {
      id: "teacher", title: "Teacher", subtitle: "More time for teaching",
      dayToDay: "Prepare lessons, teach, mark attendance, assign work, share updates and assess learning.",
      peacefulDay: "See the plan before class, teach the session, mark attendance once, set homework and close the class. No duplicate system entry or class time lost to passing papers around.",
      helps: [["Plan and teach", "Use lesson plans, materials, daily diary and curriculum coverage in the teaching flow."], ["Prepare exams", "Build from question banks, check prior use and coverage, choose marks and create paper versions."], ["Evaluate with choice", "Enter marks manually or use scanned answer sheets and AI-assisted scoring with teacher review."], ["Close the loop", "Record question-level outcomes and feedback, handle recheck requests, then publish papers and progress cards for families to view."]],
      timeBack: "Reduce repetitive entry and paper hand-offs so class time stays focused on learning."
    },
    {
      id: "transport", title: "Transport administrator", subtitle: "Trips, people and vehicles",
      dayToDay: "Maintain routes and stops, schedule trips, assign vehicles and crews, and watch for delays or changes.",
      peacefulDay: "Routes, trips and rosters are ready before departure. A replacement bus or new driver can pick up the route guidance, while alerts bring only delayed or problematic trips to your attention.",
      helps: [["Routes and rosters", "Register buses, link GPS, set routes and stops, create trips, and assign fleet, driver and helper."], ["Smooth substitutions", "A changed bus or new driver can see the trip roster, planned stops and usual route guidance."], ["Exception alerts", "Set delay thresholds and focus on trips that need attention; recorded absences can update the stop plan."], ["Family and vehicle records", "Record pickup changes, call parents, capture boarding and alighting, and track maintenance, renewals, insurance and driver credentials."]],
      timeBack: "Coordinate by exception rather than chasing every trip manually."
    },
    {
      id: "admissions", title: "Admissions coordinator", subtitle: "One view of every route",
      dayToDay: "Respond to enquiries, follow up with families, schedule tests and counselling, and complete application records.",
      peacefulDay: "See each prospect and next step in one admissions view, whether they came by walk-in, an institute entrance test or board-level exam counselling.",
      helps: [["Capture prospects", "Bring walk-ins and CRM channel enquiries into an admissions pipeline."], ["Run institute entrance exams", "Plan candidate lists, exams, results and follow-up."], ["Manage board counselling", "Track ranks, counselling choices, offers, documents and admission confirmation."]],
      timeBack: "Keep follow-up visible so the team can focus on families who need a response."
    },
    {
      id: "finance", title: "Finance / Accounts", subtitle: "Money in, money out",
      dayToDay: "Collect fees, follow up on dues, record expenses, pay vendors and prepare reports.",
      peacefulDay: "Start with current balances and exceptions. Collections, outflows, vendor payments and classroom-level budgets reconcile into reports when you need them.",
      helps: [["Collect and follow up", "Track dues and send reminders through the institute’s chosen communication channels."], ["Control spending", "Use approval flows, vendor payments and cost or profit centres for clear accountability."], ["Plan ahead", "Review consolidated reports, budget forecasts and academic-year budgets by classroom."]],
      timeBack: "Spend less time consolidating figures across branches and spreadsheets."
    },
    {
      id: "admin", title: "Campus / HR administrator", subtitle: "People and campus operations",
      dayToDay: "Manage employee records, attendance, leave, monthly payroll, campus assets and operational requests.",
      peacefulDay: "See what is due, what needs a decision and what is already complete—from monthly payroll preparation to asset maintenance.",
      helps: [["Monthly payroll", "Prepare consolidated earnings, deductions and statutory reports, with payslips emailed to employees."], ["People operations", "Connect staff records, leave, attendance, roles and salary details."], ["Campus readiness", "Track assets, inventory, maintenance schedules and supporting documents."]],
      timeBack: "Keep recurring work and pending exceptions visible in one place."
    },
    {
      id: "other", title: "Another role", subtitle: "Make it your day",
      dayToDay: "Every institute role has its own priorities, hand-offs and pressure points.",
      peacefulDay: "Tell me what you do in a typical day. We can follow that workflow together and shape the demo around the steps that matter to you.",
      helps: [["Start with your work", "Choose the processes you own or hand off to another team."], ["Explore the relevant flows", "Open admissions, learning, finance, people, campus or another module."], ["Adapt as we learn", "Use BuildDyn for institute-specific workflows and discuss gaps as they come up."]],
      timeBack: "We will focus the conversation on your role, not make you sit through every module."
    }
  ];

  var topicGroups = [
    {
      title: "Institute operational flows",
      topics: [
        { id: "admissions", title: "Admissions", hint: "Three admission routes, one view" },
        { id: "fees", title: "Fee follow-up", hint: "Follow up with families across channels" },
        { id: "transport", title: "Transportation", hint: "Use your existing hardware" },
        { id: "hostel", title: "Hostel", hint: "Explore the flow you use" }
      ]
    },
    {
      title: "Learning and student experience",
      topics: [
        { id: "lms", title: "LMS", hint: "Content, assignments, online classes" },
        { id: "mobile", title: "Mobile app", hint: "More than alerts" },
        { id: "attendance", title: "Attendance & daily diary", hint: "The student day at a glance" },
        { id: "teaching", title: "Lesson plans & assessment", hint: "Plan, teach and assess" },
        { id: "timetables", title: "Timetables", hint: "Build and manage class schedules" }
      ]
    },
    {
      title: "People and campus operations",
      topics: [
        { id: "people", title: "HR & payroll", hint: "Monthly employee summaries" },
        { id: "campus", title: "Assets & inventory", hint: "Track campus resources" },
        { id: "library", title: "Library", hint: "Library workflows in one place" },
        { id: "frontoffice", title: "Front office & community", hint: "Meetings, chat, blogs" },
        { id: "beyond", title: "Beyond learning", hint: "Swimming, sports, campus space" },
        { id: "finance", title: "Finance", hint: "Follow every rupee" },
        { id: "studentrecords", title: "Student records", hint: "A connected student information view" },
        { id: "circulars", title: "Circulars & notices", hint: "Institute-wide communications" },
        { id: "certificates", title: "Certificates & documents", hint: "Keep institute documents organised" },
        { id: "complaints", title: "Complaints & grievances", hint: "Track follow-up to resolution" },
        { id: "alumni", title: "Alumni", hint: "Maintain alumni connections" },
        { id: "compliance", title: "Compliance preparation", hint: "Organise institute records" }
      ]
    },
    {
      title: "Platform and institute fit",
      topics: [
        { id: "branches", title: "Multi-branch institutes", hint: "Local style or shared approach" },
        { id: "builddyn", title: "BuildDyn & custom gaps", hint: "Extend workflows to fit" },
        { id: "stack", title: "Technology stack", hint: "School · UniverseIT · SAP BTP" },
        { id: "more", title: "More workflows", hint: "Bring another institute process to explore" },
        { id: "testing", title: "How we test", hint: "Expected and unexpected behaviour" },
        { id: "support", title: "Support", hint: "In-app help and open sessions" }
      ]
    }
  ];

  var topicDetails = {
    admissions: {
      group: "Admissions",
      question: "How does your team move an application from enquiry to admission?",
      summary: "The staff admissions flow tracks applications through review, offer, waitlist and confirmation, then creates the student record when confirmed.",
      steps: ["Track an application from review through offer, waitlist and confirmed admission", "Record documents, counsellor follow-ups, entrance exam or interview roster, scores and rank", "Check seat availability; make individual or bulk decisions and convert a confirmed applicant into a student"]
    },
    fees: {
      group: "Fee follow-up",
      question: "How do you reach families about fees?",
      summary: "Manage fee structures and instalment demands, record collections, and follow up overdue balances through configured communication channels.",
      steps: ["Create fee structures, terms and student instalment schedules", "Track pending, partial, paid and overdue balances, with configurable grace periods and late-fine rules", "Manage concessions and scholarships with approval, issue receipts, and process refunds", "Send configured reminders by email, SMS or WhatsApp, with in-app alerts available separately"]
    },
    transport: {
      group: "Transportation",
      question: "How do you manage transport today?",
      summary: "Manage the transport operation from route and vehicle setup through scheduled trips and student boarding records.",
      steps: ["Register buses and other vehicles; link GPS device IDs/providers and attach insurance, fitness, PUC and permit records", "Build routes, stops, regular or one-off trips, passenger registrations and trip rosters; assign or replace a bus on the route serving a trip", "Assign a driver and conductor/attendant per trip; a covering driver can open that trip’s route and roster", "Record trip start, stop arrivals, odometer and each passenger’s boarding/deboarding", "Record a rider’s same-day absence or pickup change so the crew manifest and stop counts update, helping the crew avoid an unnecessary wait", "Track driver licence, badge, police verification and documents; set recurring vehicle service reminders by date or kilometres and log fuel, repair and incidents"]
    },
    hostel: {
      group: "Hostel",
      question: "How does your institute manage hostel operations?",
      summary: "Manage hostel applications and approvals through to room and bed allocation, with occupancy tracked at bed level.",
      steps: ["Set up hostel blocks, room types, rooms and beds with live occupancy status", "Receive applications, maintain a waitlist and route decisions for approval", "Allocate a specific bed to a student or employee; record transfers and vacating", "Manage planned home visits and hostel-linked food subscriptions"]
    },
    lms: {
      group: "Learning management",
      question: "How simple should it be to manage learning online?",
      summary: "Teachers share subject learning resources, collect assignment work and run online or coaching sessions in connected flows.",
      steps: ["Publish video, PDF, link, text and slide content by subject or section", "Create assignments; track on-time or late submissions, grade them, or return them for work", "Schedule online classes and retain their meeting links or recordings", "Run coaching sessions with a class roster, attendance and a close-out summary of coverage, next lesson and homework"]
    },
    mobile: {
      group: "Mobile app",
      question: "What should families and staff be able to do on mobile?",
      summary: "The mobile codebase includes role-based experiences for families, students, teachers, transport and campus operations, with institute-controlled feature switches.",
      steps: ["Provide separate student, parent, teacher, front-office, transport and operations experiences", "Surface features such as attendance, timetable, fees, leave, circulars, meetings, transport and service tickets", "Switch features on or off globally or per branch; payment and live vehicle position are disabled by default"]
    },
    attendance: {
      group: "Attendance and daily diary",
      question: "How do you keep track of the school day?",
      summary: "Student attendance supports per-day, morning/afternoon or per-period capture, with teacher attendance and student-day notes alongside it.",
      steps: ["Capture student attendance per day, morning/afternoon or per period, as configured for the course", "Take staff attendance and record attendance for coaching or learning sessions", "Upload a marked class sheet for OCR-assisted capture, then review exceptions", "Connect attendance with the student register, mobile view and class/session summary"]
    },
    teaching: {
      group: "Lesson plans and assessment",
      question: "How do you plan, cover and evaluate learning?",
      summary: "Plan subject content and lesson coverage, then connect teaching activity to tests, marks and learning outcomes.",
      steps: ["Organise subject content into chapters, sections and topics with notes, questions, videos or documents", "Plan lessons and track what was planned versus covered", "Build question banks, quizzes and sealed exam papers from reusable blueprints", "Schedule exams, manage hall tickets and enter marks; handle re-evaluations and supplementary tests", "Use AI-assisted answer-script scoring with teacher review, then prepare report cards and direct outcome-attainment evidence"]
    },
    timetables: {
      group: "Timetables",
      question: "How do you plan and share timetables?",
      summary: "Plan weekly section timetables from reusable templates, with rules for teacher availability and timetable constraints.",
      steps: ["Create reusable weekly templates with periods, breaks and subject-teacher assignments", "Generate a proposal against teacher availability and institute constraints", "Review placements and see why periods could not be placed", "Arrange substitute coverage when a teacher is unavailable"]
    },
    people: {
      group: "HR and payroll",
      question: "How do you bring HR and payroll together each month?",
      summary: "Manage employee records, roles, salary structures, leave and attendance, then run payroll with statutory calculations and employee payslips.",
      steps: ["Maintain employee profiles, qualifications, experience, branch roles and employment history", "Manage leave requests, staff attendance, shifts, salary templates and revisions", "Run monthly payroll with configured PF, ESI, professional tax and income-tax calculations", "Create bank disbursement and statutory return files, full-and-final settlement and emailed payslips"]
    },
    campus: {
      group: "Assets and inventory",
      question: "How do you keep track of campus assets and supplies?",
      summary: "Track fixed assets and consumable inventory, including requests, custody, verification and upkeep.",
      steps: ["Register assets, calculate depreciation and assign equipment to students or employees", "Record physical checks by manual entry or barcode/RFID and track missing or misplaced items", "Manage stock, vendor records and requests, including partial approval and fulfilment", "Schedule recurring maintenance for assets or spaces and confirm completed work"]
    },
    library: {
      group: "Library",
      question: "How does your library manage books and borrowing today?",
      summary: "Manage library resources and circulation, with overdue items and fines contributing to student or employee dues clearance.",
      steps: ["Maintain the book catalogue and individual copy records", "Issue, return and renew books for borrowers", "Track overdue items and fines", "Connect outstanding library dues with student clearance and no-dues checks"]
    },
    frontoffice: {
      group: "Front office and community",
      question: "How does your front office connect visitors, staff and families?",
      summary: "Front-office operations cover visitor appointments and walk-ins, plus gate passes; meetings, chat and blogs are connected institute workflows.",
      steps: ["Register visitors by appointment or walk-in and record their institute contact", "Issue and return gate passes with an approval route where required", "Schedule recurring or one-off meetings, including parent–teacher meetings", "Coordinate staff through direct/group chat and tasks; publish blogs through review and approval"]
    },
    beyond: {
      group: "Beyond learning",
      question: "What could your campus make possible after class?",
      summary: "Support student clubs and activities with membership, event planning, campus spaces, transport and expense tracking.",
      steps: ["Run clubs for students or staff and manage membership", "Plan events with organisers, campus-space bookings and transport needs", "Record event expenses and route event and expense approvals", "Reserve rooms, halls or grounds for activities beyond class hours"]
    },
    finance: {
      group: "Finance",
      question: "Can you track every rupee coming in and going out?",
      summary: "Use double-entry vouchers, cost and profit centres, budgets, bank reconciliation and finance reports to follow money across operations.",
      steps: ["Post balanced receipt, payment, journal and contra vouchers into open periods", "Attribute transactions to cost centres and profit centres, including classroom-level reporting where configured", "Plan budgets and review ledger, voucher register and budget-versus-actual reports", "Reconcile bank activity and review consolidated campus totals with the right access"]
    },
    studentrecords: {
      group: "Student records",
      question: "Can your team find the full student picture in one place?",
      summary: "Keep each student’s profile, admission, documents and previous-school history connected to their academic enrolments and daily operations.",
      steps: ["Maintain student profiles, contact and health information, previous-school history and attachments", "Track admission type and student status separately from year-by-year course enrolment", "Connect students to programmes, streams, steps, sections and optional subjects", "Open related fee, attendance, exam, transport, hostel and library records from their operating modules"]
    },
    circulars: {
      group: "Circulars and notices",
      question: "How do you share institute-wide updates?",
      summary: "Create circulars with audience targeting, attachments and an approval-to-publication lifecycle.",
      steps: ["Draft a circular with a type, audience, channels and attachments", "Route the notice for approval", "Publish, withdraw or expire it with its delivery state recorded"]
    },
    certificates: {
      group: "Certificates and documents",
      question: "How do students and staff request certificates or documents?",
      summary: "Issue configurable certificate types to students or employees, retain document records and route approvals when needed.",
      steps: ["Configure certificate types for students and employees", "Review requests and check approvals or no-dues clearance where required", "Issue or reject certificates and keep the supporting documents in the record vault"]
    },
    complaints: {
      group: "Complaints and grievances",
      question: "How are concerns tracked through to resolution?",
      summary: "Track grievances and statutory complaint registers with ownership, priority, investigation status and resolution history.",
      steps: ["Register a grievance and track its priority, owner and resolution status", "Maintain dedicated statutory registers for anti-ragging, POSH and RTI complaints", "Record investigation progress, escalation and closure"]
    },
    alumni: {
      group: "Alumni",
      question: "How does your institute stay connected with alumni?",
      summary: "Maintain a branch-scoped alumni directory and organise alumni events with registrations.",
      steps: ["Maintain a branch-scoped alumni directory", "Plan alumni events and record registrations", "Connect alumni with institute events, placements and donation workflows"]
    },
    compliance: {
      group: "Compliance preparation",
      question: "How do you prepare institute records for review?",
      summary: "Plan recurring compliance requirements, due dates, submissions and supporting evidence; connect outcome data to accreditation evidence.",
      steps: ["Maintain recurring regulatory requirements and branch/year due-date calendars", "Track submissions and retain supporting evidence", "Prepare accreditation evidence from outcome data", "Import UDISE+, AISHE, SATS or UUCMS exports, review differences and resolve them; the system does not file directly to portals"]
    },
    branches: {
      group: "Multi-branch institutes",
      question: "How should each branch work?",
      summary: "UniverseIT supports multiple branches and education levels, from Playgroup through postgraduate.",
      steps: ["Manage multiple branches and education levels from Playgroup to postgraduate", "Let campuses configure their own operating approach or share common practices", "Scope operational data to the branch while authorised teams see consolidated information"]
    },
    builddyn: {
      group: "BuildDyn and institute-specific gaps",
      question: "What if a standard workflow doesn’t fit?",
      summary: "BuildDyn helps address institute-specific workflow gaps. If a requirement falls outside BuildDyn, SAPTECHS will create a simple app at no cost within the agreed scope.",
      steps: ["Use BuildDyn to shape institute workflows", "At no cost: a simple, two-page app", "Create, view, update and delete records"]
    },
    stack: {
      group: "Technology stack",
      question: "How does the technology stack fit together?",
      summary: "The school sits at the top, UniverseIT provides the institute platform, and SAP BTP Cloud is the technology foundation.",
      steps: ["School or college", "UniverseIT", "SAP BTP Cloud"]
    },
    more: {
      group: "More institute applications",
      question: "Which other institute workflows matter to your team?",
      summary: "Beyond the main flows, UniverseIT includes specialist apps for campus life, student support, governance and everyday coordination.",
      steps: ["Canteen and mess: menus, subscriptions, meal attendance, sales, wallets and day-close reconciliation", "Student welfare and mentorship: discipline, counselling, infirmary visits, mentor groups and check-ins", "Campus safety and services: visitor and gate-pass records, security rosters, space reservations and maintenance tasks", "Community: clubs and events, surveys, alumni, placements, donations, tasks, chat and meetings", "Governance: configurable approvals, dashboards and reports, audit history, consent and government-data reconciliation", "Bring any additional process; we can assess whether an existing app, BuildDyn or a small custom app fits"]
    },
    testing: {
      group: "How we test",
      question: "Will you invite your team to test both expected and unexpected paths?",
      summary: "Testing unexpected paths helps uncover issues and improve how the product responds.",
      steps: ["Try the way people are expected to use a flow", "Try the ways they might not be expected to use it", "Tell us where the experience could respond better"]
    },
    support: {
      group: "Support",
      question: "Where can users get help when they have a question?",
      summary: "Users can get help inside each application or speak with us directly.",
      steps: ["Find help and answers within each application", "Join a daily open question session at 4:00 p.m.", "Call directly for quick clarification when needed"]
    }
  };

  var topicFeatureTitles = {
    admissions: ["Application journey", "Exams and follow-up", "Seats and decisions"],
    fees: ["Fee plans", "Balances and fines", "Concessions and refunds", "Family reminders"],
    transport: ["Fleet and GPS", "Routes, trips and roster", "Trip crew and cover", "Boarding records", "Same-day rider changes", "Driver papers and servicing"],
    hostel: ["Rooms and beds", "Applications and waitlist", "Resident allocation", "Home visits and meals"],
    lms: ["Learning resources", "Assignments", "Online classes", "Coaching sessions"],
    mobile: ["Role-based access", "Everyday services", "Branch feature switches"],
    attendance: ["Student attendance", "Staff and session attendance", "OCR sheet capture", "Connected student day"],
    teaching: ["Syllabus resources", "Lesson coverage", "Question banks and quizzes", "Exams and results", "AI-assisted marking"],
    timetables: ["Weekly templates", "Rule-based generation", "Placement review", "Substitute coverage"],
    people: ["Employee records", "Leave and staff time", "Payroll and statutory", "Bank files and payslips"],
    campus: ["Asset register", "Verification and depreciation", "Stock and requests", "Maintenance tasks"],
    library: ["Catalogue and copies", "Issue and return", "Overdues and fines", "No-dues clearance"],
    frontoffice: ["Visitors", "Gate passes", "Meetings", "Tasks, chat and blogs"],
    beyond: ["Clubs and membership", "Events and logistics", "Approvals and expenses", "Space reservations"],
    finance: ["Vouchers and ledger", "Cost and profit centres", "Budgets and reports", "Bank reconciliation"],
    studentrecords: ["Student profile", "Admission and status", "Academic enrolment", "Connected records"],
    circulars: ["Targeted notices", "Approval", "Publication and delivery"],
    certificates: ["Certificate types", "Review and clearance", "Issue and document vault"],
    complaints: ["Grievance register", "Statutory registers", "Investigation and closure"],
    alumni: ["Alumni directory", "Events and registration", "Branch-level access"],
    compliance: ["Requirements calendar", "Evidence and submissions", "Accreditation evidence", "Portal reconciliation"],
    branches: ["Multiple branches", "Playgroup to postgraduate", "Local or shared operations"],
    builddyn: ["No-code app building", "Custom workflow gaps", "Simple CRUD apps"],
    stack: ["School or college", "UniverseIT", "SAP BTP Cloud"],
    more: ["Canteen and mess", "Welfare and mentorship", "Safety and campus services", "Community and activities", "Governance and insight", "Additional workflows"],
    testing: ["Expected behaviour", "Unexpected behaviour", "Improve from feedback"],
    support: ["In-app help", "Daily open session", "Direct phone support"]
  };

  function escapeHTML(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function push(next) {
    stack.push(current);
    current = next;
    render();
  }

  function goBack() {
    if (!stack.length) return;
    current = stack.pop();
    render();
  }

  function showMenu() {
    push({ id: "topicMenu" });
  }

  function restart() {
    stack = [];
    selectedRoleId = "founder";
    current = { id: "welcome" };
    render();
  }

  function button(action, label, kind, dock) {
    return '<button type="button" class="action-button ' + (kind || "") + '" data-action="' + action + '"' + (dock ? ' data-dock="true"' : "") + '>' + label + '</button>';
  }

  function choice(action, label, value, dock) {
    return '<button type="button" class="choice-button" data-action="' + action + '"' + (value ? ' data-value="' + value + '"' : "") + (dock ? ' data-dock="true"' : "") + '><span>' + label + '</span><span class="chevron" aria-hidden="true">›</span></button>';
  }

  function renderWelcome() {
    return '<section class="welcome-screen"><div class="welcome-inner"><img class="welcome-lockup" src="assets/universeit-lockup-onblue.svg" alt="UniverseIT, a product by SAPTECHS" /><p class="welcome-label">SCHOOL &amp; COLLEGE DEMO</p><div class="welcome-accent" aria-hidden="true"></div><h1>Thank you</h1><p class="welcome-subtitle">A guided journey through your institute’s digital experience.</p><button type="button" class="continue-button" data-action="intro">Begin the Journey <span aria-hidden="true">→</span></button></div></section>';
  }

  function productCatalog() {
    return [
      { id: "proficit", name: "ProficIT", tagline: "ERP for SMEs", status: "In development", detail: "An ERP platform for small and medium-sized enterprises, currently in development." },
      { id: "proficit-h2r", name: "ProficIT - Hire to Retire", tagline: "HR platform", status: "Individual product", detail: "A standalone HR platform covering the employee journey from hire to retirement." },
      { id: "proficit-accountant", name: "ProficIT - Accountant", tagline: "Finance management", status: "Individual product", detail: "A standalone finance management product for accounting workflows." },
      { id: "p2po2c", name: "ProficIT P2P / O2C", tagline: "Procure to Pay · Order to Cash", status: "Product flows", detail: "Focused Procure-to-Pay and Order-to-Cash flows for business operations." },
      { id: "approflow", name: "ApproFlow", tagline: "Approval Flow Manager", status: "Ready for customers", detail: "A configurable approval manager for routing and tracking business approvals." },
      { id: "builddyn", name: "BuildDyn", tagline: "Dynamic App Builder", status: "Ready for customers", detail: "A no-code and low-code app builder for creating focused apps and adapting workflows." },
      { id: "universeit", name: "UniverseIT", tagline: "Digital assistant for institutes", status: "Open for customer trials", detail: "A next-generation digital platform for schools and colleges. The SAP application readiness check is in progress." }
    ];
  }

  function renderProductBrowser() {
    var products = productCatalog();
    var selected = products.find(function (product) { return product.id === current.product; }) || products.find(function (product) { return product.id === "universeit"; });
    var items = products.map(function (product) {
      return '<button class="product-option' + (product.id === selected.id ? ' is-selected' : '') + '" type="button" data-action="selectProduct" data-value="' + product.id + '" aria-pressed="' + (product.id === selected.id) + '"><strong>' + product.name + '</strong><span>' + product.tagline + '</span></button>';
    }).join("");
    return '<div class="product-browser"><div class="product-options" role="group" aria-label="SAPTECHS products">' + items + '</div><article class="product-detail" id="product-detail" aria-live="polite">' + renderProductDetail(selected) + '</article></div>';
  }

  function renderProductDetail(selected) {
    return '<p class="small-label">' + selected.status + '</p><h2>' + selected.name + '</h2><p class="lead">' + selected.detail + '</p>';
  }

  function globalWorkEngagements() {
    return [
      { id: "nike", name: "NIKE", group: "Global brands", logo: "https://cdn.simpleicons.org/nike/111111", detail: "Developer · 2 years 8 months", route: "Product Migration Cockpit · SAP Labs India", note: "The product is used by NIKE and other apparel customers.", summary: "A global sports company behind NIKE, Jordan and Converse brands. Its products span athletic footwear, apparel and equipment.", source: "https://about.nike.com/en/" },
      { id: "mercedes", name: "Mercedes-Benz", group: "Global brands", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Mercedes-Benz%20Star%202022.svg", detail: "Senior SAP Full Stack Developer · 3 years", route: "Through Infosys", summary: "A premium automotive company producing passenger cars and vans. Its wider business also includes financial and mobility services.", source: "https://group.mercedes-benz.com/en/" },
      { id: "rollsroyce", name: "Rolls-Royce", group: "Global brands", logo: "https://cdn.simpleicons.org/rollsroyce/111111", detail: "SAP Full Stack Developer · 8 months", route: "Through Robert Bosch", summary: "An engineering company designing, building and maintaining mission-critical power systems. Its businesses include civil aerospace, defence and power systems.", source: "https://www.rolls-royce.com/about" },
      { id: "sanofi", name: "SANOFI", group: "Global brands", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Sanofi-2022.svg", detail: "SAP ABAP Developer · 3 years 6 months", route: "Through CGI", summary: "A global biopharmaceutical company focused on human health. It researches, develops and delivers medicines and vaccines.", source: "https://www.sanofi.com/en/our-company" },
      { id: "ab", name: "AB InBev", group: "Global brands", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Anheuser-Busch%20InBev%20-%20logo%20(Belgium%2C%202022-).svg", detail: "Senior SAP ABAP Developer · 3 years", summary: "A global brewer with a portfolio of beer brands enjoyed in markets around the world. The company also invests in digital products and innovation.", source: "https://www.ab-inbev.com/about-us-what-we-do" },
      { id: "alstom", name: "ALSTOM", group: "Technology and products", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Alstom_logo.svg", detail: "SAP Full Stack Developer · 2 years 4 months", summary: "A rail mobility company delivering trains, signalling, infrastructure and services. Its systems help move passengers around the world.", source: "https://www.alstom.com/company" },
      { id: "melitta", name: "Melitta", group: "Technology and products", logo: "https://commons.wikimedia.org/wiki/Special:FilePath/Logo%20Melitta%20%28Unternehmen%29.svg", detail: "SAP Full Stack Developer · 4 years", summary: "An international, family-owned group of companies. Its businesses include coffee, coffee preparation and household products.", source: "https://www.melitta-group.com/en/karriere/we-are-melitta" },
      { id: "gramont", name: "GRAMONT", group: "Technology and products", detail: "Senior SAP Full Stack Developer · 5 years", route: "Product: LabelNow", note: "LabelNow is used by brands including Nestlé, Bayer and Tropicana.", summary: "GRAMONT’s LabelNow is a cloud-based labelling solution for process industries. It helps create compliant product label content for digital and physical channels.", source: "https://www.gramont.consulting/products/labelnow-plm-label-solution" },
      { id: "hindware", name: "Hindware", group: "SAPTECHS customers", logo: "https://images.assettype.com/fortune-india/import/company/logos/Hindware%20Home%20Innovation%20Ltd.png", detail: "SAP Full Stack Developer", route: "Customer work through SAPTECHS", summary: "An Indian home and building-products brand with offerings across bath products, tiles, kitchen and home appliances, and plumbing solutions.", source: "https://hindware.com/about-the-company" },
      { id: "agiglasspac", name: "AGI Glasspac", group: "SAPTECHS customers", logo: "https://images.seeklogo.com/logo-png/35/1/agi-glaspac-with-hsil-logo-png_seeklogo-350748.png", detail: "SAP Full Stack Developer", route: "Customer work through SAPTECHS", summary: "An Indian manufacturer of glass containers for food, pharmaceuticals and beverages. Its packaging serves a range of consumer and industrial sectors.", source: "https://www.agi-glaspac.com/about/" }
    ];
  }

  function renderCompanyDetail(selected) {
    return '<p class="small-label">Selected experience</p>' + (selected.logo ? '<div class="company-detail-logo"><img src="' + selected.logo + '" alt="' + selected.name + ' logo" loading="lazy" onerror="this.parentNode.hidden=true"></div>' : '') + '<h3>' + selected.name + '</h3><p>' + selected.detail + '</p>' + (selected.route ? '<p class="company-route">' + selected.route + '</p>' : '') + (selected.note ? '<p class="company-note">' + selected.note + '</p>' : '') + '<p class="company-summary">' + selected.summary + '</p><a class="company-source" href="' + selected.source + '" target="_blank" rel="noreferrer">Company overview ↗</a>';
  }

  function renderGlobalWorkBrowser() {
    var engagements = globalWorkEngagements();
    var selected = engagements.find(function (engagement) { return engagement.id === current.company; }) || engagements[0];
    var activeGroup = "";
    var options = engagements.map(function (engagement) {
      var groupHeading = engagement.group !== activeGroup ? '<p class="company-group-label">' + (activeGroup = engagement.group) + '</p>' : '';
      var logo = engagement.logo ? '<img class="company-option-logo" src="' + engagement.logo + '" alt="" loading="lazy" onerror="this.hidden=true">' : '<span class="company-option-wordmark">' + engagement.name + '</span>';
      return groupHeading + '<button class="company-option' + (engagement.id === selected.id ? ' is-selected' : '') + '" type="button" data-action="selectCompany" data-value="' + engagement.id + '" aria-label="' + engagement.name + '" aria-pressed="' + (engagement.id === selected.id) + '">' + logo + '<span class="company-option-label">' + engagement.name + '</span></button>';
    }).join("");
    return '<div class="global-work-browser"><div class="company-options" role="group" aria-label="Selected client and product experience">' + options + '</div><article class="company-detail" id="company-detail" aria-live="polite">' + renderCompanyDetail(selected) + '</article></div>';
  }

  function renderIntro() {
    return '<section class="page page-founder"><div class="intro-grid"><div class="founder-profile"><h1>Jagadeesh Nanabala</h1><div class="intro-stat"><strong>14+</strong><span>years in SAP technology</span></div><section class="founder-highlights"><p class="small-label">Certifications</p><p class="credential">SAP Global Certified Fiori Developer<br>Certified Fiori Administrator</p><p class="small-label">Awards · SAP Labs India</p><p class="award-line">Star Innovator<br>Quarterly Innovation Award</p></section><div class="founder-languages"><p class="small-label">Languages</p><p class="work-list">Telugu: native speaker · English: intermediate<br>Tamil, Kannada and Hindi: conversational</p></div><div class="founder-interests"><p class="small-label">Outside work</p><p>Cricket <span>·</span> Good food <span>·</span> Building things with code</p></div></div><section class="global-work-panel"><p class="small-label">Selected global work</p><h2>Client and product experience</h2><p class="company-prompt">Select an engagement to see my role, duration and delivery route.</p>' + renderGlobalWorkBrowser() + '</section></div><div class="button-row">' + button("saptechsIntro", "Next", "", true) + '</div></section>';
  }

  function renderSaptechsIntro() {
    return '<section class="page page-saptechs"><div class="saptechs-heading"><p class="eyebrow">INTRODUCTION · FOUNDED 2023</p><h1>SAPTECHS</h1><p class="lead">I started SAPTECHS in 2023 to provide SAP technical services. We now support Hindware and AGI Glasspac with their technical development needs.</p></div><div class="product-family-panel"><p class="small-label">Products and solutions</p><p class="product-prompt">Select a product to learn more.</p>' + renderProductBrowser() + '</div><div class="button-row">' + button("universeStory", "Next", "", true) + '</div></section>';
  }

  function universeStoryItems() {
    return [
      { id: "connected", title: "One connected platform", summary: "Bring day-to-day institute operations into one digital experience." },
      { id: "education", title: "Playgroup to postgraduate", summary: "Support multiple branches and education levels across the institute." },
      { id: "branches", title: "Each branch, its own way", summary: "Let branches work in their own style or follow one shared approach." }
    ];
  }

  function renderUniverseStoryBrowser() {
    var items = universeStoryItems();
    var selected = items.find(function (item) { return item.id === current.storySection; }) || items[0];
    var options = items.map(function (item, index) {
      return '<button type="button" class="story-option' + (item.id === selected.id ? ' is-selected' : '') + '" data-action="selectStorySection" data-value="' + item.id + '" aria-pressed="' + (item.id === selected.id) + '"><span>0' + (index + 1) + '</span><strong>' + item.title + '</strong></button>';
    }).join("");
    return '<div class="story-browser"><div class="story-options" role="group" aria-label="Why we built UniverseIT">' + options + '</div><article class="story-detail" id="story-detail" aria-live="polite"><p class="small-label">WHY IT MATTERS</p><h2>' + selected.title + '</h2><p>' + selected.summary + '</p></article></div>';
  }

  function renderUniverseStory() {
    return '<section class="page"><p class="eyebrow">INTRODUCTION · STARTED JANUARY 2025</p><h1>UniverseIT</h1><p class="story-strapline">Built around the realities of Indian institutes.</p><p class="lead">We began with a clear goal: make a world-class institute platform affordable, so teams can work in one connected system.</p><h2 class="story-section-title">What shaped the platform</h2>' + renderUniverseStoryBrowser() + '<p class="story-team"><strong>Started by Jagadeesh</strong><span>Thanuja and Navyasree joined the development team as developers.</span></p><div class="button-row">' + button("techStackPage", "Next", "", true) + '</div></section>';
  }

  function renderTechStackPage() {
    return '<section class="page"><p class="eyebrow">Technology foundation</p><h1>Built on a cloud platform. Shaped for institutes.</h1>' + renderStackDiagram() + '<div class="button-row">' + button("aboutSap", "Next", "", true) + '</div></section>';
  }

  function sapOverviewSections() {
    return [
      { id: "scale-businesses", title: "Customer reach", hint: "320,000+ businesses", heading: "Enterprise technology at global scale", summary: "SAP reports serving more than 320,000 businesses worldwide, supporting organisations across industries and sizes.", metric: "320,000+", metricLabel: "businesses" },
      { id: "scale-countries", title: "Global presence", hint: "180+ countries", heading: "Used across the world", summary: "SAP customers operate in more than 180 countries, bringing enterprise software to local markets and global operations.", metric: "180+", metricLabel: "countries" },
      { id: "scale-fortune", title: "Fortune 500", hint: "90%+ use SAP", heading: "Trusted by leading organisations", summary: "More than 90% of Fortune 500 companies use SAP solutions in some part of their operations.", metric: "90%+", metricLabel: "of Fortune 500 companies use SAP" },
      { id: "foundation", title: "SAP’s beginnings", hint: "Founded in 1972", heading: "Built on decades of enterprise software", summary: "SAP was founded in 1972 by five entrepreneurs and is headquartered in Walldorf, Germany.", tags: ["Founded 1972", "Walldorf, Germany"] },
      { id: "applications", title: "Business applications", hint: "Connected business operations", heading: "Software across core business areas", summary: "SAP develops enterprise applications that connect day-to-day operations across organisations.", tags: ["Finance", "Procurement", "HR", "Supply chain", "Customer experience"] },
      { id: "btp", title: "SAP BTP", hint: "Platform for technology and innovation", heading: "Build, connect and extend", summary: "SAP Business Technology Platform brings together application development, automation, integration, data and analytics, and AI capabilities.", tags: ["Application development", "Automation", "Integration", "Data & analytics", "AI"] }
    ];
  }

  function renderSapOverviewDetail(section) {
    return '<p class="small-label">' + section.hint + '</p>' + (section.metric ? '<p class="sap-detail-metric">' + section.metric + '<span>' + section.metricLabel + '</span></p>' : '') + '<h2>' + section.heading + '</h2><p class="sap-detail-summary">' + section.summary + '</p>';
  }

  function renderAboutSap() {
    var sections = sapOverviewSections().slice(3);
    var selected = sections.find(function (section) { return section.id === current.sapSection; }) || sections[0];
    var options = sections.map(function (section, index) {
      return '<button class="sap-overview-option' + (section.id === selected.id ? ' is-selected' : '') + '" type="button" data-action="selectSapSection" data-value="' + section.id + '" aria-pressed="' + (section.id === selected.id) + '"><span class="sap-option-index">0' + (index + 1) + '</span><span><strong>' + section.title + '</strong><small>' + section.hint + '</small></span></button>';
    }).join("");
    return '<section class="page page-about-sap"><p class="eyebrow">About SAP</p><h1>Enterprise technology with a broad foundation.</h1><p class="lead">SAP develops enterprise applications that connect business operations such as finance, procurement, HR, supply chain and customer experience.</p><div class="sap-scale-stats" aria-label="SAP at a glance"><div><strong>320,000+</strong><span>businesses</span></div><div><strong>180+</strong><span>countries</span></div><div><strong>90%+</strong><span>of the Fortune 500 use SAP</span></div></div><div class="sap-overview-browser"><div class="sap-overview-options" role="group" aria-label="About SAP topics">' + options + '</div><article class="sap-overview-detail" id="sap-overview-detail" aria-live="polite">' + renderSapOverviewDetail(selected) + '</article></div><p class="disclaimer">UniverseIT is developed by SAPTECHS. It is not an SAP product. SAP and SAP BTP are trademarks of SAP SE. <a href="https://www.sap.com/about/company.html" target="_blank" rel="noreferrer">About SAP</a> · <a href="https://help.sap.com/docs/btp/sap-business-technology-platform" target="_blank" rel="noreferrer">SAP BTP</a> · <a href="https://www.sap.com/about/customer-stories.html" target="_blank" rel="noreferrer">SAP customer figures</a></p><div class="button-row">' + button("roleJourney", "Next", "", true) + '</div></section>';
  }

  function renderRoleJourneyDetail(role) {
    var supportItems = role.helps.map(function (item) {
      return '<div class="role-help-item"><strong>' + escapeHTML(item[0]) + '</strong><p>' + escapeHTML(item[1]) + '</p></div>';
    }).join("");
    return '<article class="role-detail" id="role-detail" aria-live="polite"><div class="role-detail-head"><div><p class="small-label">YOUR ROLE</p><h2>' + escapeHTML(role.title) + '</h2></div><span class="role-subtitle">' + escapeHTML(role.subtitle) + '</span></div><section class="role-daily"><p class="small-label">DAY TO DAY</p><p>' + escapeHTML(role.dayToDay) + '</p></section><section class="role-peaceful"><p class="small-label">AN IDEAL, PEACEFUL DAY</p><p>' + escapeHTML(role.peacefulDay) + '</p></section><section class="role-helps"><p class="small-label">WHERE UNIVERSEIT HELPS</p><div class="role-help-list">' + supportItems + '</div></section><p class="role-timeback"><strong>Time back</strong><span>' + escapeHTML(role.timeBack) + '</span></p></article>';
  }

  function renderRoleJourney() {
    var selected = instituteRoles.find(function (role) { return role.id === selectedRoleId; }) || instituteRoles[0];
    var options = instituteRoles.map(function (role) {
      var active = role.id === selected.id;
      return '<button class="role-option' + (active ? ' is-selected' : '') + '" type="button" data-action="selectRole" data-value="' + role.id + '" aria-pressed="' + active + '"><strong>' + escapeHTML(role.title) + '</strong><span>' + escapeHTML(role.subtitle) + '</span></button>';
    }).join("");
    return '<section class="page page-role-journey"><div class="role-journey-intro"><div><p class="eyebrow">Before we explore</p><h1>What does a good day look like in your role?</h1></div><p>Choose the perspective closest to yours. We’ll start with the work that matters to you.</p></div><div class="role-journey-layout"><div class="role-options" role="group" aria-label="Institute roles">' + options + '</div>' + renderRoleJourneyDetail(selected) + '</div><div class="button-row">' + button("firstQuestion", "Continue to your priorities", "", true) + '</div></section>';
  }

  function renderFirstQuestion() {
    var selected = instituteRoles.find(function (role) { return role.id === selectedRoleId; }) || instituteRoles[0];
    return '<section class="page page-narrow page-question"><div class="question-panel"><p class="eyebrow">First, your priorities · ' + escapeHTML(selected.title) + '</p><h1>Is there anything you’d like to explore first, apart from pricing?</h1><p class="lead">Tell me what’s on your mind and we’ll talk it through together.</p><div class="choice-list">' + choice("askGaps", "Nothing", null, true) + '</div></div></section>';
  }

  function renderPointForm() {
    return '<section class="page page-narrow"><div class="question-panel"><p class="eyebrow">Your question</p><h1>What would you like me to answer?</h1><div class="text-entry"><label for="point-text">Tell me what you have in mind</label><textarea id="point-text" placeholder="A question, process or flow you’d like to understand"></textarea><small>Your response stays in this browser session and helps guide our conversation.</small><div class="button-row"><button class="action-button" type="button" data-action="submitPoint" data-dock="true">Let’s discuss this</button><button class="action-button action-secondary" type="button" data-action="askGaps" data-dock="true">I’ll start with ERP gaps</button></div></div></div></section>';
  }

  function renderPointResult() {
    return '<section class="page page-narrow"><p class="eyebrow">Let’s start with your point</p><h1>We’ll explore this together.</h1><blockquote class="response-quote">' + escapeHTML(current.text || "Your question") + '</blockquote><p class="lead">Choose a related flow when you are ready.</p><div class="button-row">' + button("menu", "Find a related flow", "", true) + button("firstQuestion", "Ask another question", "action-secondary", true) + '</div></section>';
  }

  function renderGapQuestion() {
    return '<section class="page page-narrow page-question"><div class="question-panel"><p class="eyebrow">Your experience with institute systems</p><h1>Have you found gaps in your institute’s digital systems?</h1><p class="lead">If so, tell me about it and we’ll talk through the process. If not, choose a flow or feature to explore.</p><div class="choice-list">' + choice("allGood", "Nothing", null, true) + '</div></div></section>';
  }

  function renderGapForm() {
    return '<section class="page page-narrow"><div class="question-panel"><p class="eyebrow">Tell me about the gap</p><h1>Which process should we explore?</h1><div class="text-entry"><label for="gap-text">Describe the gap or workflow</label><textarea id="gap-text" placeholder="Where does your current process become difficult or stop fitting?"></textarea><small>Your example will help me choose the most relevant flow to explore with you.</small><div class="button-row"><button class="action-button" type="button" data-action="submitGap" data-dock="true">Explore this gap</button><button class="action-button action-secondary" type="button" data-action="allGood" data-dock="true">Skip to flow choices</button></div></div></div></section>';
  }

  function renderGapResult() {
    return '<section class="page page-narrow"><p class="eyebrow">Your institute’s workflow</p><h1>Let’s talk through this process.</h1><blockquote class="response-quote">' + escapeHTML(current.text || "A workflow gap") + '</blockquote><p class="lead">We’ll open the closest flow and explore it with you. You can switch topics whenever you like.</p><div class="button-row">' + button("menu", "Choose a flow", "", true) + '</div></section>';
  }

  function renderFlowQuestion() {
    var choices = [{ id: "menu", title: "Choose an institute flow", text: "Browse admissions, finance, learning, campus operations and more." }, { id: "quickTour", title: "Take a quick feature tour", text: "Start with the mobile app, attendance or the daily diary." }];
    var selected = choices.find(function (item) { return item.id === current.flowChoice; }) || choices[0];
    return '<section class="page page-narrow page-question"><div class="question-panel"><p class="eyebrow">If everything is going well</p><h1>Would you like to explore a particular flow?</h1><p class="lead">Choose where we should begin.</p><div class="choice-browser"><div class="choice-options" role="group" aria-label="Ways to explore">' + choices.map(function (item) { return '<button class="choice-option' + (item.id === selected.id ? ' is-selected' : '') + '" type="button" data-action="selectFlowChoice" data-value="' + item.id + '" aria-pressed="' + (item.id === selected.id) + '">' + item.title + '</button>'; }).join("") + '</div><article class="choice-detail" id="flow-choice-detail"><h2>' + selected.title + '</h2><p>' + selected.text + '</p><button class="action-button" type="button" data-action="' + selected.id + '">' + (selected.id === "menu" ? "Browse flows" : "Start the tour") + '</button></article></div></div></section>';
  }

  function renderQuickTour() {
    var picks = [
      ["mobile", "Mobile app", "More than alerts"],
      ["attendance", "Attendance", "For students and teachers"],
      ["attendance", "Daily diary", "Explore the everyday learning flow"]
    ];
    var selected = picks.find(function (pick) { return pick[1] === current.tourTopic; }) || picks[0];
    return '<section class="page"><div class="topic-intro"><div><p class="eyebrow">A quick feature tour</p><h1>Where should we begin?</h1></div><p>Choose a topic to explore. You can return to the full menu whenever you like.</p></div><div class="quick-tour-browser"><div class="quick-tour-options" role="group" aria-label="Quick tour topics">' + picks.map(function (pick) { return '<button class="quick-tour-option' + (pick[1] === selected[1] ? ' is-selected' : '') + '" type="button" data-action="selectTourTopic" data-value="' + pick[1] + '" aria-pressed="' + (pick[1] === selected[1]) + '">' + pick[1] + '</button>'; }).join("") + '</div><article class="quick-tour-detail"><h2>' + selected[1] + '</h2><p>' + selected[2] + '</p><button class="action-button" type="button" data-action="topic" data-value="' + selected[0] + '">Explore ' + selected[1] + '</button></article></div><div class="button-row">' + button("menu", "Open all topics", "action-secondary", true) + '</div></section>';
  }

  function renderTopicMenu() {
    var topics = topicGroups.flatMap(function (group) { return group.topics; });
    var pills = topics.map(function (topic) {
      var searchText = escapeHTML((topic.title + " " + topic.hint).toLowerCase());
      return '<button class="topic-pill" type="button" data-action="topic" data-value="' + topic.id + '" data-search="' + searchText + '"><strong>' + topic.title + '</strong><span>' + topic.hint + '</span></button>';
    }).join("");
    return '<section class="page page-topic-menu"><div class="topic-intro"><div><p class="eyebrow">Institute operations</p><h1>What would you like to explore?</h1></div><p>Search for a flow or choose any topic.</p></div><label class="topic-search"><span class="sr-only">Search flows and features</span><span class="topic-search-icon" aria-hidden="true">⌕</span><input id="topic-search" type="search" placeholder="Search admissions, LMS, payroll…" autocomplete="off" /></label><div class="topic-pill-list" id="topic-pill-list">' + pills + '</div><p class="topic-empty" id="topic-empty" hidden>No matching topics. Try another search.</p></section>';
  }

  function renderStackDiagram(selectedIndex) {
    var active = function (index) { return selectedIndex === index ? ' is-active' : ''; };
    return '<div class="stack-wrap"><div class="pyramid" role="img" aria-label="Technology stack pyramid: School at the top, UniverseIT in the middle, SAP BTP Cloud at the base"><div class="school-flag" aria-hidden="true"></div><div class="pyramid-layer pyramid-school' + active(0) + '">SCHOOL</div><div class="pyramid-layer pyramid-universe' + active(1) + '">UniverseIT</div><div class="pyramid-layer pyramid-btp' + active(2) + '">SAP BTP CLOUD</div></div><div class="stack-notes"><div class="stack-note' + active(0) + '"><strong>School or college</strong><span>Defines its needs and operating approach.</span></div><div class="stack-note' + active(1) + '"><strong>UniverseIT</strong><span>Connects institute workflows across branches and teams.</span></div><div class="stack-note' + active(2) + '"><strong>SAP BTP Cloud</strong><span>Provides the cloud platform layer.</span></div></div></div>';
  }

  function renderBuildDyn() {
    return '<div class="feature-banner"><div class="feature-number">100%</div><strong>workflow gap coverage</strong></div><p class="topic-response">BuildDyn helps shape institute-specific workflows. If a requirement falls outside BuildDyn, SAPTECHS will create a simple app at no cost within the agreed scope.</p><ul class="topic-list"><li>At no cost: a simple, two-page app.</li><li>Create, view, update and delete records.</li></ul>';
  }

  function renderBehavior() {
    return '<div class="principle-layout"><div><strong>How to behave</strong><p>Try the path your team is expected to follow.</p></div><div><strong>How not to behave</strong><p>Test edge cases and actions people may take unexpectedly. These are especially useful for finding issues.</p></div></div><p class="topic-response">We don’t ask users, “Why did you do that?” UniverseIT explains what will happen and lets the user decide whether to continue.</p>';
  }

  function renderTopicFeatureDetail(id, topic, index) {
    var labels = topicFeatureTitles[id] || [];
    var title = labels[index] || ('Feature ' + (index + 1));
    var detail = topic.steps[index] || topic.summary;
    var extra = id === "stack" ? renderStackDiagram(index) : "";
    if (id === "builddyn") extra = '<div class="feature-detail-note"><strong>Gap coverage</strong><span>For a simple two-page CRUD app outside BuildDyn, SAPTECHS provides it at no cost within the agreed scope.</span></div>';
    return '<article class="topic-feature-detail" id="topic-feature-detail" aria-live="polite"><p class="small-label">FEATURE ' + String(index + 1).padStart(2, "0") + '</p><h2>' + title + '</h2><p>' + detail + '</p>' + extra + '</article>';
  }

  function renderTopicFeatureBrowser(id, topic) {
    var labels = topicFeatureTitles[id] || [];
    var selectedIndex = Number.isInteger(current.featureIndex) && current.featureIndex < topic.steps.length ? current.featureIndex : 0;
    var options = topic.steps.map(function (feature, index) {
      var title = labels[index] || ('Feature ' + (index + 1));
      return '<button type="button" class="topic-feature-option' + (index === selectedIndex ? ' is-selected' : '') + '" data-action="selectTopicFeature" data-value="' + index + '" aria-pressed="' + (index === selectedIndex) + '"><span class="topic-feature-index">' + String(index + 1).padStart(2, "0") + '</span><strong>' + title + '</strong></button>';
    }).join("");
    return '<h2 class="topic-features-title">Explore this module</h2><div class="topic-feature-browser"><div class="topic-feature-options" role="group" aria-label="' + topic.group + ' features">' + options + '</div>' + renderTopicFeatureDetail(id, topic, selectedIndex) + '</div>';
  }

  function renderTopic(id) {
    var topic = topicDetails[id];
    if (!topic) return renderTopicMenu();
    var body = renderTopicFeatureBrowser(id, topic);
    return '<section class="page"><p class="eyebrow">' + topic.group + '</p><h1>' + topic.question + '</h1><p class="topic-ask">' + topic.summary + '</p>' + body + '</section>';
  }

  function renderSupport() {
    return '<section class="page"><p class="eyebrow">Help when you need it</p><h1>Support is part of every flow.</h1><div class="feature-rail"><div><strong>In every application</strong><p>Find help inside each app.</p></div><div><strong>Every day · 4:00 p.m.</strong><p>Join an open session to ask questions.</p></div><div><strong>Direct phone support</strong><p>Call us for a quick answer, any time.</p></div></div><div class="button-row">' + button("menu", "Choose another flow", "", true) + '</div></section>';
  }

  function syncPageActions() {
    pageActions.replaceChildren();
    stage.querySelectorAll('[data-dock="true"]').forEach(function (button) {
      button.removeAttribute("data-dock");
      pageActions.append(button);
    });
    bottomDock.classList.toggle("has-page-actions", pageActions.children.length > 0);
  }

  function render() {
    var id = current.id;
    topbar.hidden = id === "welcome";
    bottomDock.hidden = id === "welcome";
    backButton.disabled = stack.length === 0;
    if (id === "welcome") stage.innerHTML = renderWelcome();
    else if (id === "intro") stage.innerHTML = renderIntro();
    else if (id === "saptechsIntro") stage.innerHTML = renderSaptechsIntro();
    else if (id === "universeStory") stage.innerHTML = renderUniverseStory();
    else if (id === "techStackPage") stage.innerHTML = renderTechStackPage();
    else if (id === "aboutSap") stage.innerHTML = renderAboutSap();
    else if (id === "roleJourney") stage.innerHTML = renderRoleJourney();
    else if (id === "firstQuestion") stage.innerHTML = renderFirstQuestion();
    else if (id === "pointForm") stage.innerHTML = renderPointForm();
    else if (id === "pointResult") stage.innerHTML = renderPointResult();
    else if (id === "gapQuestion") stage.innerHTML = renderGapQuestion();
    else if (id === "gapForm") stage.innerHTML = renderGapForm();
    else if (id === "gapResult") stage.innerHTML = renderGapResult();
    else if (id === "flowQuestion") stage.innerHTML = renderFlowQuestion();
    else if (id === "quickTour") stage.innerHTML = renderQuickTour();
    else if (id === "topicMenu") stage.innerHTML = renderTopicMenu();
    else if (id === "topic") stage.innerHTML = renderTopic(current.topic);
    else if (id === "support") stage.innerHTML = renderSupport();
    syncPageActions();
    stage.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest("[data-action]");
    if (!target) return;
    if (target.tagName === "A") event.preventDefault();
    var action = target.getAttribute("data-action");
    var value = target.getAttribute("data-value");
    if (action === "intro") push({ id: "intro" });
    else if (action === "saptechsIntro") push({ id: "saptechsIntro" });
    else if (action === "selectRole") {
      selectedRoleId = value;
      stage.querySelectorAll(".role-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var role = instituteRoles.find(function (item) { return item.id === value; });
      var roleDetail = document.getElementById("role-detail");
      if (role && roleDetail) roleDetail.outerHTML = renderRoleJourneyDetail(role);
    }
    else if (action === "selectSapSection") {
      current.sapSection = value;
      document.querySelectorAll(".sap-overview-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var section = sapOverviewSections().find(function (item) { return item.id === value; });
      var detail = document.getElementById("sap-overview-detail");
      if (section && detail) detail.innerHTML = renderSapOverviewDetail(section);
    }
    else if (action === "selectStorySection") {
      current.storySection = value;
      document.querySelectorAll(".story-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var storyItem = universeStoryItems().find(function (item) { return item.id === value; });
      var storyDetail = document.getElementById("story-detail");
      if (storyItem && storyDetail) storyDetail.innerHTML = '<p class="small-label">WHY IT MATTERS</p><h2>' + storyItem.title + '</h2><p>' + storyItem.summary + '</p>';
    }
    else if (action === "selectFlowChoice") {
      current.flowChoice = value;
      document.querySelectorAll(".choice-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var flowChoice = value === "quickTour" ? { title: "Take a quick feature tour", text: "Start with the mobile app, attendance or the daily diary.", action: "quickTour", label: "Start the tour" } : { title: "Choose an institute flow", text: "Browse admissions, finance, learning, campus operations and more.", action: "menu", label: "Browse flows" };
      var flowDetail = document.getElementById("flow-choice-detail");
      if (flowDetail) flowDetail.innerHTML = '<h2>' + flowChoice.title + '</h2><p>' + flowChoice.text + '</p><button class="action-button" type="button" data-action="' + flowChoice.action + '">' + flowChoice.label + '</button>';
    }
    else if (action === "selectTourTopic") {
      current.tourTopic = value;
      document.querySelectorAll(".quick-tour-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var selectedPick = [ ["mobile", "Mobile app", "More than alerts"], ["attendance", "Attendance", "For students and teachers"], ["attendance", "Daily diary", "Explore the everyday learning flow"] ].find(function (pick) { return pick[1] === value; });
      var tourDetail = document.querySelector(".quick-tour-detail");
      if (selectedPick && tourDetail) tourDetail.innerHTML = '<h2>' + selectedPick[1] + '</h2><p>' + selectedPick[2] + '</p><button class="action-button" type="button" data-action="topic" data-value="' + selectedPick[0] + '">Explore ' + selectedPick[1] + '</button>';
    }
    else if (action === "selectCompany") {
      current.company = value;
      document.querySelectorAll(".company-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var engagement = globalWorkEngagements().find(function (item) { return item.id === value; });
      var detail = document.getElementById("company-detail");
      if (engagement && detail) detail.innerHTML = renderCompanyDetail(engagement);
    }
    else if (action === "selectProduct") {
      current.product = value;
      document.querySelectorAll(".product-option").forEach(function (option) {
        var selected = option.getAttribute("data-value") === value;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var product = productCatalog().find(function (item) { return item.id === value; });
      var detail = document.getElementById("product-detail");
      if (product && detail) detail.innerHTML = renderProductDetail(product);
    }
    else if (action === "universeStory") push({ id: "universeStory" });
    else if (action === "techStackPage") push({ id: "techStackPage" });
    else if (action === "aboutSap") push({ id: "aboutSap" });
    else if (action === "roleJourney") push({ id: "roleJourney" });
    else if (action === "firstQuestion") push({ id: "firstQuestion" });
    else if (action === "specificPoint") push({ id: "pointForm" });
    else if (action === "askGaps") push({ id: "gapQuestion" });
    else if (action === "gapForm") push({ id: "gapForm" });
    else if (action === "allGood") showMenu();
    else if (action === "quickTour") push({ id: "quickTour" });
    else if (action === "menu") showMenu();
    else if (action === "selectTopicFeature") {
      var featureIndex = Number(value);
      var activeTopic = topicDetails[current.topic];
      if (!activeTopic || !Number.isInteger(featureIndex) || featureIndex < 0 || featureIndex >= activeTopic.steps.length) return;
      current.featureIndex = featureIndex;
      stage.querySelectorAll(".topic-feature-option").forEach(function (option) {
        var selected = Number(option.getAttribute("data-value")) === featureIndex;
        option.classList.toggle("is-selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      var featureDetail = document.getElementById("topic-feature-detail");
      if (featureDetail) featureDetail.outerHTML = renderTopicFeatureDetail(current.topic, activeTopic, featureIndex);
    }
    else if (action === "topic") push({ id: "topic", topic: value });
    else if (action === "submitPoint") {
      var point = document.getElementById("point-text");
      if (point && point.value.trim()) push({ id: "pointResult", text: point.value.trim() });
      else if (point) point.focus();
    } else if (action === "submitGap") {
      var gap = document.getElementById("gap-text");
      if (gap && gap.value.trim()) push({ id: "gapResult", text: gap.value.trim() });
      else if (gap) gap.focus();
    } else if (action === "back") goBack();
    else if (action === "restart") restart();
  });

  stage.addEventListener("toggle", function (event) {
    var expanded = event.target;
    if (!expanded.matches("details.topic-group") || !expanded.open) return;
    stage.querySelectorAll("details.topic-group[open]").forEach(function (group) {
      if (group !== expanded) group.open = false;
    });
  }, true);

  stage.addEventListener("input", function (event) {
    if (!event.target.matches("#topic-search")) return;
    var query = event.target.value.trim().toLowerCase();
    var visible = 0;
    stage.querySelectorAll(".topic-pill").forEach(function (pill) {
      var matches = !query || pill.getAttribute("data-search").indexOf(query) >= 0;
      pill.hidden = !matches;
      if (matches) visible += 1;
    });
    document.getElementById("topic-empty").hidden = visible > 0;
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !topbar.hidden) goBack();
  });

  render();
})();

