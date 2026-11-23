const walkthroughFlows = [
  {
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
    title: 'Open a financial year and verify its periods',
    outcome: 'Financial year 2026–27 is Open and has 12 periods.',
    steps: [
      ['financemaster-year.jpg', 'Set and verify the financial year', 'In Finance Master, open Financial Years and add the year from 1 April 2026 to 31 March 2027. After saving, check the dates and Open status.'],
      ['financemaster-periods.jpg', 'Verify the monthly periods', 'Open Financial Periods and confirm the list contains 12 monthly periods for the year.'],
    ],
  },
  {
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
    title: 'Verify the Class 9 and Class 10 fee assignments',
    outcome: 'Fee Assignment shows the day scholar template as Complete for both classes.',
    steps: [
      ['demo-banashankari-class9-fees.png', 'Review Class 9 fees', 'Open the Class 9 Fee tab and check the selected template and amounts.'],
      ['demo-banashankari-class10-fees.png', 'Review Class 10 fees', 'Open the same tab for Class 10 and check each fee item.'],
      ['demo-feeassignment-haasket-complete.png', 'Read back both assignments', 'Find the Banashankari 2026–27 plan in Fee Assignment and check both class rows for Complete.'],
    ],
  },
  {
    title: 'Configure the academic calendar',
    outcome: 'The teaching term and weekend rules appear in the campus calendar.',
    steps: [
      ['demo-banashankari-weekly-offs.png', 'Set the campus scope', 'Open Academic Calendar for Banashankari and add weekly Saturday and Sunday rules for the teaching dates.'],
      ['demo-banashankari-term-weekends.png', 'Verify the teaching term and weekends', 'Add the teaching term and review the calendar for the term entry and repeating weekend closures.'],
      ['demo-calendar-checklist-done.png', 'Record calendar completion', 'Return to Academic Year Planner and check that Publish academic calendar shows Done.'],
    ],
  },
  {
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
    title: 'Commence the academic year',
    outcome: 'The course is Commenced and the academic year reads back as Active.',
    steps: [
      ['demo-banashankari-course-approved.png', 'Verify course approval', 'In Academic Year Planner, confirm the Banashankari course is approved.'],
      ['demo-commencement-eight-of-eight.png', 'Review the commencement checklist', 'Verify that all eight checklist items show Done before commencing the course.'],
      ['demo-banashankari-year-active.png', 'Commence and reopen the year', 'Commence the approved course. Reopen the 2026–27 year to confirm Active status.'],
    ],
  },
  {
    title: 'Create and preview a student ID card template',
    outcome: 'The student landscape template was saved In Progress. Layout completion and issuance were pending.',
    steps: [
      ['idcardmanager-template-inventory.jpg', 'Open the campus template inventory', 'In ID Card Manager, open Templates and choose New Template.'],
      ['idcardmanager-create-template.jpg', 'Enter the template details', 'Name the template, choose Students and Landscape, then save.'],
      ['idcardmanager-saved-template.jpg', 'Verify the saved draft', 'Check the saved campus, audience, orientation and In Progress status.'],
      ['idcardmanager-preview-template.jpg', 'Open the preview', 'Use Preview to inspect the sample-values view before designing the layout.'],
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
document.querySelector('#open-walkthroughs').addEventListener('click', () => {
  if (stepPicker.options.length === 0) showWalkthroughFlow();
  walkthrough.showModal();
});
