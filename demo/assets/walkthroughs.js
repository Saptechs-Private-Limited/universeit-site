const walkthroughFlows = [
  {
    topic: "branches",
    title: 'Set up an institution group and its branches',
    outcome: 'The group’s Branches tab shows two active campuses.',
    steps: [
      ['institutiongroups-eight.jpg', 'Find the institution groups', 'Search for HaasKet and check the Trust column.'],
      ['institutiongroups-group-form.jpg', 'Open New Group of Institutions', 'Select Education Seva Trust, enter a unique code and name, then set the group type and institute stage. Save the group.'],
      ['institutiongroups-branch-form.jpg', 'Add a branch under the group', 'Open the group’s Branches tab and choose Add. Confirm the parent group, enter a unique branch code and name, then save.'],
      ['institutiongroups-branches.jpg', 'Verify the saved branches', 'Reopen the group and confirm both branch rows show Active.'],
    ],
  },
  {
    topic: "finance",
    title: 'Open a financial year and verify its periods',
    outcome: 'Financial year 2026–27 is Open and has 12 periods.',
    steps: [
      ['financemaster-year.jpg', 'Set and verify the financial year', 'In Finance Master, open Financial Years and add the year from 1 April 2026 to 31 March 2027. After saving, check the dates and Open status.'],
      ['financemaster-periods.jpg', 'Verify the monthly periods', 'Open Financial Periods and confirm the list contains 12 monthly periods for the year.'],
    ],
  },
  {
    topic: "teaching",
    title: 'Create Class 9 Section A and assign teachers',
    outcome: 'Section A has a classroom, capacity, class teacher, leave approver and five subject teachers.',
    steps: [
      ['aymanager-section-approver.jpg', 'Add Section A', 'In Academic Year Planner, open Class 9 → Sections. Choose Add Section, enter A and select the student leave approver.'],
      ['aymanager-section-a-saved.jpg', 'Open the saved section', 'Check that A appears in the Sections table and open the row.'],
      ['aymanager-section-a-details.jpg', 'Set the classroom, class teacher and capacity', 'Under Details, select Classroom 201, assign a class teacher and set capacity to 40. Reopen Details to verify the saved values.'],
      ['aymanager-section-a-teacher-edit.jpg', 'Assign the subject teachers', 'Open Subject Teachers → Edit, select a teacher for each subject and save.'],
      ['aymanager-section-a-five-teachers.jpg', 'Verify the five assignments', 'Read back each subject and its assigned teacher.'],
    ],
  },
  {
    topic: "finance",
    title: 'Verify the Class 9 and Class 10 fee assignments',
    outcome: 'Fee Assignment shows the day scholar template as Complete for both classes.',
    steps: [
      ['demo-banashankari-class9-fees.png', 'Review Class 9 fees', 'Open the Class 9 Fee tab and check the selected template and amounts.'],
      ['demo-banashankari-class10-fees.png', 'Review Class 10 fees', 'Open the same tab for Class 10 and check each fee item.'],
      ['demo-feeassignment-haasket-complete.png', 'Read back both assignments', 'Find the Banashankari 2026–27 plan in Fee Assignment and check both class rows for Complete.'],
    ],
  },
  {
    topic: "teaching",
    title: 'Configure the academic calendar',
    outcome: 'The teaching term and weekend rules appear in the campus calendar.',
    steps: [
      ['demo-banashankari-weekly-offs.png', 'Set the campus scope', 'Open Academic Calendar for Banashankari and add weekly Saturday and Sunday rules for the teaching dates.'],
      ['demo-banashankari-term-weekends.png', 'Verify the teaching term and weekends', 'Add the teaching term and review the calendar for the term entry and repeating weekend closures.'],
      ['demo-calendar-checklist-done.png', 'Record calendar completion', 'Return to Academic Year Planner and check that Publish academic calendar shows Done.'],
    ],
  },
  {
    topic: "timetables",
    title: 'Prepare and verify section timetables',
    outcome: 'Both sections read back as Ready after a publication timeout. Session rebuild completeness remained unverified.',
    steps: [
      ['demo-class10-timetable-skeleton.png', 'Review the section timetable', 'Open the section’s Timetable tab and check the teaching blocks and breaks generated from the schedule template.'],
      ['demo-banashankari-timetable-proposal.png', 'Review the campus proposal', 'Check the filled teaching periods across both sections before submitting publication.'],
      ['demo-timetable-publish-504.png', 'Inspect the publication response', 'The request timed out. Reopen the year and check the persisted state before retrying.'],
      ['demo-timetable-two-sections-ready.png', 'Read back both sections', 'Open Timetable Readiness and verify the two Ready rows and their teaching period counts.'],
    ],
  },
  {
    topic: "teaching",
    title: 'Commence the academic year',
    outcome: 'The course is Commenced and the academic year reads back as Active.',
    steps: [
      ['demo-banashankari-course-approved.png', 'Verify course approval', 'In Academic Year Planner, confirm the Banashankari course is approved.'],
      ['demo-commencement-eight-of-eight.png', 'Review the commencement checklist', 'Verify that all eight checklist items show Done before commencing the course.'],
      ['demo-banashankari-year-active.png', 'Commence and reopen the year', 'Commence the approved course. Reopen the 2026–27 year to confirm Active status.'],
    ],
  },
  {
    topic: "certificates",
    title: 'Create, preview and version a student ID card template',
    outcome: 'The Education Seva template was saved as a draft. The separate Sree Chaitanya QA run verified layout preview, completion and versioning.',
    steps: [
      ['idcardmanager-template-inventory.jpg', 'Open the campus template inventory', 'In ID Card Manager, open Templates and choose New Template.'],
      ['idcardmanager-create-template.jpg', 'Enter the template details', 'Name the template, choose Students and Landscape, then save.'],
      ['idcardmanager-saved-template.jpg', 'Verify the saved draft', 'Check the saved campus, audience, orientation and In Progress status.'],
      ['idcardmanager-preview-template.jpg', 'Open the draft preview', 'Use Preview to inspect the sample-values view before designing the layout.'],
      ['qa-id-card-layout-preview.png', 'Verify the rendered card in the QA campus', 'After adding a layout and mapping the student name placeholder, preview the card and check that Print Preview is available.'],
      ['qa-id-card-complete-layout-locked.png', 'Complete version 1', 'Complete the QA template and verify the original layout can no longer be edited.'],
      ['qa-id-card-version-coexistence.png', 'Verify version 2 is a separate draft', 'Create a new version and reopen Templates to verify that v1 remains Complete and v2 is In Progress.'],
    ],
  },
  {
    topic: "admissions",
    title: "Check direct student admission requirements",
    outcome: "The rehearsal reached required-field validation. Student creation, enrolment and parent verification still need screenshots.",
    steps: [
      ["studentadmission-required-fixtures.jpg","Review the Create Student form","Open Student Admission and choose Create Student. Review the required identity and parent-contact fields before saving. The form also describes the enrolment and parent privacy verification handoff."],
    ],
  },
  {
    topic: "fees",
    alsoFor: "mobile",
    title: "Review outstanding fees in the family app",
    outcome: "The family can see the outstanding balance and which item is overdue. The capture ends before payment.",
    steps: [
      ["ipad-home-original.png","Open Fees from Home","Select the Fees shortcut for the current learner."],
      ["ipad-fees-original.png","Check the balance and due item","Review the amount due, the overdue item and the available Pay Now action."],
    ],
  },
  {
    topic: "attendance",
    title: "Review attendance in the family app",
    outcome: "The app shows attendance percentages and recorded attendance for the learner.",
    steps: [
      ["samsung-home-raw.png","Go to the learner’s Home","From Home, use the bottom navigation to open Academics."],
      ["samsung-academics-raw.png","Open Attendance","Select Attendance from the Academics screen."],
      ["samsung-attendance-raw.png","Read the attendance summary","Check the current and overall percentages, then read the status on the listed date."],
    ],
  },
  {
    topic: "attendance",
    title: "Read the class diary in the family app",
    outcome: "The diary shows class updates organized under the selected date.",
    steps: [
      ["ipad-academics-original.png","Open Class Diary from Academics","Select Class Diary for the current learner."],
      ["ipad-class-diary-original.png","Read the entries for the day","Check the date and read the entries by subject."],
    ],
  },
  {
    topic: "lms",
    title: "Find subject course content in the family app",
    outcome: "The published app captures show subject navigation through to the course-content list.",
    steps: [
      ["ipad-academics-original.png","Find Course content under Academics","Open the learning area for the current learner."],
      ["ipad-course-content-original.png","Choose the subject to explore","Use the subject list to locate the course whose materials you want to see."],
    ],
  },
  {
    topic: "timetables",
    title: "Check the learner’s timetable in the family app",
    outcome: "The learner can see the scheduled lessons, times and breaks for the selected day.",
    steps: [
      ["iphone-academics-original.png","Open Timetable from Academics","Select Timetable for the current learner."],
      ["iphone-timetable-original.png","Read the day’s schedule","Choose the date and review the lessons, start times and breaks."],
    ],
  },
  {
    topic: "branches",
    title: "Configure a campus, classroom and departments",
    outcome: "The rehearsal verified the campus hours, Classroom 201 and two departments under Secondary Academics.",
    steps: [
      ["branchmaster-haasket-list.jpg","Find the branch in Branch Master","Filter the list for the institute and open the exact campus."],
      ["branchmaster-banashankari-hours.jpg","Set the operating hours","In branch details, enter the opening and closing times and save."],
      ["branchmaster-classroom-201.jpg","Verify the classroom","Open Spaces and check the saved room code, category and capacity."],
      ["departmentmaster-secondary-academics.jpg","Verify the top-level department","In Department Master, open Secondary Academics and confirm the campus."],
      ["departmentmaster-stem-child.jpg","Verify the Mathematics and Science department","Read back the parent department and campus on the child record."],
      ["departmentmaster-language-child.jpg","Verify the Languages and Social Studies department","Confirm that the second child also belongs to Secondary Academics."],
    ],
  },
  {
    topic: "certificates",
    title: "Issue and replace a staff ID card",
    outcome: "The QA register recorded the first card as Replaced and the new copy as Generated. Physical printing was outside this run.",
    steps: [
      ["qa-id-card-staff-register.jpg","Find the generated card","In ID Card Manager, open Issue Register → To Receive. Select the generated card and mark it received before moving to the issuance queue."],
      ["qa-id-card-staff-issued.jpg","Verify the card is issued","After marking the card issued, open the Issued queue and check its status."],
      ["qa-id-card-staff-replacement.jpg","Replace the lost card and verify both copies","Use Replace, select Lost and save. Open the All view to check that the prior copy is Replaced and the new copy is Generated."],
    ],
  },
];

const walkthrough = document.querySelector('#walkthroughs');
const flowPicker = document.querySelector('#walkthrough-flow');
const stepPicker = document.querySelector('#walkthrough-step');
const previousStep = document.querySelector('#walkthrough-previous');
const nextStep = document.querySelector('#walkthrough-next');
const screenshot = document.querySelector('#walkthrough-image');
const original = document.querySelector('#walkthrough-original');

function showWalkthroughStep() {
  const flow = walkthroughFlows[flowPicker.selectedIndex];
  const index = stepPicker.selectedIndex;
  const [file, heading, instruction] = flow.steps[index];
  const src = `assets/walkthroughs/${file}`;
  document.querySelector('#walkthrough-heading').textContent = heading;
  document.querySelector('#walkthrough-instruction').textContent = instruction;
  screenshot.alt = `UniverseIT screen showing the step “${heading}”`;
  screenshot.src = src;
  original.href = src;
  original.setAttribute('aria-label', `Open full-size screenshot for “${heading}” in a new tab`);
  previousStep.disabled = index === 0;
  nextStep.disabled = index === flow.steps.length - 1;
}

function showWalkthroughFlow() {
  const flow = walkthroughFlows[flowPicker.selectedIndex];
  document.querySelector('#walkthrough-outcome').textContent = flow.outcome;
  stepPicker.replaceChildren(...flow.steps.map((_, index) =>
    new Option(`${index + 1} of ${flow.steps.length}`, index)
  ));
  showWalkthroughStep();
}

flowPicker.replaceChildren(...walkthroughFlows.map(flow => new Option(flow.title)));
flowPicker.addEventListener('change', showWalkthroughFlow);
stepPicker.addEventListener('change', showWalkthroughStep);
previousStep.addEventListener('click', () => {
  stepPicker.selectedIndex -= 1;
  showWalkthroughStep();
  if (previousStep.disabled) nextStep.focus();
});
nextStep.addEventListener('click', () => {
  stepPicker.selectedIndex += 1;
  showWalkthroughStep();
  if (nextStep.disabled) previousStep.focus();
});
document.querySelector('#stage').addEventListener('click', event => {
  const opener = event.target.closest('[data-walkthroughs]');
  if (!opener) return;
  if (opener.dataset.walkthroughs) {
    const index = walkthroughFlows.findIndex(flow => flow.topic === opener.dataset.walkthroughs || flow.alsoFor === opener.dataset.walkthroughs);
    if (index !== -1) flowPicker.selectedIndex = index;
  }
  showWalkthroughFlow();
  walkthrough.showModal();
});
