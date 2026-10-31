import type { Certification } from '../types'

export const prince2Agile: Certification = {
  id: 'prince2-agile-foundation',
  title: 'PRINCE2 Agile Foundation',
  provider: 'PeopleCert (AXELOS)',
  level: 'Foundation · Version 2',
  emoji: '🏃',
  accent: 'emerald',
  description:
    'Combine PRINCE2 governance with agile ways of working: frameworks like Scrum and Kanban, behaviours, and how to flex what is delivered.',
  tldr: [
    'PRINCE2 Agile blends PRINCE2 governance (direction and management) with agile delivery.',
    'Fix time and cost, flex what is delivered: scope and quality criteria are prioritized instead.',
    'Agile behaviours (transparency, collaboration, rich communication, self-organization, exploration) matter as much as the processes.',
    'The exam (Version 2) is closed-book multiple choice: 40 questions, 60 minutes, 60% (24/40) to pass.',
  ],
  exam: {
    questions: 40,
    durationMinutes: 60,
    passMarkPercent: 60,
    format: 'Multiple choice, closed book.',
  },
  lastReviewed: '2026-10-31',
  sources: [
    {
      title: 'PRINCE2 Agile Foundation (Version 2)',
      publisher: 'PeopleCert',
      url: 'https://www.peoplecert.org/browse-certifications/project-programme-and-portfolio-management/PRINCE2-Agile-28/prince2-agile-foundation-4074',
    },
    {
      title: 'PRINCE2 Agile framework',
      publisher: 'PeopleCert',
      url: 'https://www.peoplecert.org/Frameworks-Professionals/PRINCE2-Agile-Framework',
    },
    {
      title: 'Manifesto for Agile Software Development',
      publisher: 'agilemanifesto.org',
      url: 'https://agilemanifesto.org/',
    },
    {
      title: 'The Scrum Guide (2020)',
      publisher: 'Ken Schwaber & Jeff Sutherland',
      url: 'https://scrumguides.org/scrum-guide.html',
    },
    {
      title: 'The Kanban Guide',
      publisher: 'Kanban Guides',
      url: 'https://kanbanguides.org/',
    },
  ],
  modules: [
    {
      id: 'agile-basics',
      title: 'Agile fundamentals',
      tldr: [
        'Agile is a family of behaviours, concepts, frameworks and techniques for iterative, incremental delivery.',
        'The Agile Manifesto has 4 values and 12 principles.',
        'Common frameworks: Scrum, Kanban, Lean startup. They are complementary, not competing.',
        'Agile works best where requirements are uncertain or likely to change.',
      ],
      sections: [
        {
          heading: 'The Agile Manifesto values',
          paragraphs: ['While there is value in the items on the right, agile values the items on the left more:'],
          bullets: [
            'Individuals and interactions over processes and tools.',
            'Working software over comprehensive documentation.',
            'Customer collaboration over contract negotiation.',
            'Responding to change over following a plan.',
          ],
        },
        {
          heading: 'Iterative and incremental',
          bullets: [
            'Iterative: work is repeated in cycles (e.g. sprints), learning and refining each time.',
            'Incremental: the product is delivered in usable parts rather than all at once.',
            'Empiricism: decisions are based on what is observed (transparency, inspection, adaptation).',
          ],
        },
        {
          heading: 'Frameworks at a glance',
          bullets: [
            'Scrum: time-boxed sprints with a product owner, scrum master and developers.',
            'Kanban: visualize work, limit work in progress and manage flow.',
            'Lean startup: build-measure-learn cycles with a minimum viable product (MVP) to test assumptions.',
            'Agile is about mindset as much as method: "being agile", not just "doing agile".',
          ],
        },
      ],
      keyTerms: [
        { term: 'Timebox', definition: 'A fixed, finite period of time in which to carry out work, e.g. a sprint.' },
        { term: 'Empiricism', definition: 'Knowledge comes from experience and making decisions based on what is observed.' },
        { term: 'MVP', definition: 'Minimum viable product: the simplest version of a product that allows maximum learning with least effort.' },
      ],
      quiz: [
        {
          id: 'p2a-basics-1',
          question: 'Which is one of the four Agile Manifesto values?',
          options: [
            'Comprehensive documentation over working software',
            'Responding to change over following a plan',
            'Contract negotiation over customer collaboration',
            'Processes and tools over individuals and interactions',
          ],
          answerIndex: 1,
          explanation: 'The manifesto values responding to change over following a plan. The others are reversed.',
        },
        {
          id: 'p2a-basics-2',
          question: 'What does "incremental" delivery mean?',
          options: [
            'Delivering everything at the end',
            'Delivering the product in usable parts over time',
            'Repeating the same work several times',
            'Increasing the budget each stage',
          ],
          answerIndex: 1,
          explanation: 'Incremental delivery releases the product in usable pieces, so value arrives earlier.',
        },
        {
          id: 'p2a-basics-3',
          question: 'Which framework is centred on a build-measure-learn cycle?',
          options: ['Scrum', 'Kanban', 'Lean startup', 'PRINCE2'],
          answerIndex: 2,
          explanation: 'Lean startup uses build-measure-learn and MVPs to validate assumptions quickly.',
        },
        {
          id: 'p2a-basics-4',
          question: 'What is a timebox?',
          options: [
            'A fixed period of time in which work is carried out',
            'A container for storing requirements',
            'A report showing time spent',
            'A tolerance on cost',
          ],
          answerIndex: 0,
          explanation: 'A timebox is a fixed, finite period of time; a sprint is an example.',
        },
        {
          id: 'p2a-basics-5',
          question: 'Agile is most beneficial when…',
          options: [
            'Requirements are fully known and fixed',
            'Requirements are uncertain or likely to change',
            'There is no customer involvement',
            'The work cannot be split up',
          ],
          answerIndex: 1,
          explanation: 'Agile thrives on feedback and change, which makes it ideal for uncertain requirements.',
        },
      ],
    },
    {
      id: 'prince2-agile-overview',
      title: 'PRINCE2 Agile overview',
      tldr: [
        'PRINCE2 covers directing and managing; agile is strongest at delivery. PRINCE2 Agile combines them.',
        'Six aspects (the "hexagon"): time and cost are fixed; scope and quality criteria are flexed; risk and benefit are managed within tolerance.',
        'Five targets: be on time, protect quality, embrace change, keep teams stable, accept the customer does not need everything.',
        'Version 2 (2025) puts extra emphasis on the agile mindset, people and leadership.',
      ],
      sections: [
        {
          heading: 'Why combine PRINCE2 and agile?',
          paragraphs: [
            'Agile frameworks focus on delivering products; they often say little about governance, business justification or managing many teams. PRINCE2 provides direction and management, while agile provides the way of working at delivery level.',
            'PRINCE2 Agile is used for projects. Ongoing product work in business as usual can use agile without PRINCE2.',
          ],
        },
        {
          heading: 'Flex what is delivered',
          bullets: [
            'Time: fixed. Deadlines are protected, often with timeboxes.',
            'Cost: fixed. Stable teams give a predictable cost.',
            'Scope: flexed. Lower-priority features may not be delivered.',
            'Quality: flexed at the level of individual quality criteria, but the overall level of quality is protected.',
            'Risk and benefit: tolerances are set and managed; benefits can be realized early via frequent releases.',
          ],
        },
        {
          heading: 'The five targets',
          bullets: [
            'Be on time and hit deadlines.',
            'Protect the level of quality.',
            'Embrace change.',
            'Keep teams stable.',
            'Accept that the customer does not need everything.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Hexagon', definition: 'A visual of the six aspects (time, cost, scope, quality, risk, benefit) showing which are fixed and which flex.' },
        { term: 'Flexing', definition: 'Varying what is delivered (scope and quality criteria) to protect time and cost.' },
      ],
      quiz: [
        {
          id: 'p2a-ov-1',
          question: 'In PRINCE2 Agile, which two aspects are normally fixed?',
          options: ['Scope and quality', 'Time and cost', 'Risk and benefit', 'Scope and time'],
          answerIndex: 1,
          explanation: 'Time and cost are fixed; what is delivered (scope, quality criteria) is flexed.',
        },
        {
          id: 'p2a-ov-2',
          question: 'Which is one of the five PRINCE2 Agile targets?',
          options: ['Deliver every requirement', 'Keep teams stable', 'Avoid all change', 'Minimize documentation'],
          answerIndex: 1,
          explanation: 'The targets: be on time, protect quality, embrace change, keep teams stable, accept the customer does not need everything.',
        },
        {
          id: 'p2a-ov-3',
          question: 'How is quality treated in PRINCE2 Agile?',
          options: [
            'Quality is always fixed in every detail',
            'Overall quality is protected, but individual quality criteria can be prioritized and flexed',
            'Quality is ignored in favour of speed',
            'Quality is decided only at project closure',
          ],
          answerIndex: 1,
          explanation: 'Quality criteria can be prioritized (e.g. MoSCoW), but the target is to protect the overall level of quality.',
        },
        {
          id: 'p2a-ov-4',
          question: 'What is PRINCE2 Agile mainly intended for?',
          options: ['Business as usual operations', 'Projects', 'Portfolio management only', 'Personal productivity'],
          answerIndex: 1,
          explanation: 'PRINCE2 Agile is for projects. Ongoing product development in BAU can use agile on its own.',
        },
        {
          id: 'p2a-ov-5',
          question: 'Why are stable teams helpful?',
          options: [
            'They make cost predictable and improve velocity over time',
            'They remove the need for a project board',
            'They allow scope to be fixed',
            'They remove the need for planning',
          ],
          answerIndex: 0,
          explanation: 'Stable teams have a known cost and become more effective as they work together.',
        },
      ],
    },
    {
      id: 'behaviours-roles',
      title: 'Behaviours, principles and roles',
      tldr: [
        'The 7 PRINCE2 principles still apply, plus agile behaviours.',
        'Behaviours: transparency, collaboration, rich communication, self-organization and exploration.',
        'Agile roles (product owner, scrum master, team) map onto PRINCE2 roles rather than replacing them.',
        'Servant leadership: leaders enable and remove impediments rather than command and control.',
      ],
      sections: [
        {
          heading: 'Agile behaviours',
          bullets: [
            'Transparency: information is open and visible, e.g. information radiators.',
            'Collaboration: working together, including with the customer.',
            'Rich communication: prefer face-to-face and visual communication over documents.',
            'Self-organization: the people doing the work decide how to do it.',
            'Exploration: learn and get feedback through frequent iterations.',
          ],
        },
        {
          heading: 'Roles',
          bullets: [
            'The project board, project manager and team manager roles remain.',
            'Product owner: often maps to a senior user or a customer subject matter expert in the delivery team, prioritizing the backlog.',
            'Scrum master / agile coach: supports the team; often sits in or alongside the team manager role.',
            'Delivery team: self-organizing, cross-functional team that builds the products.',
            'The project manager acts more like a facilitator and servant leader at the delivery level, trusting the team.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Information radiator', definition: 'A large visual display (e.g. a board or burn chart) placed where everyone can see it.' },
        { term: 'Self-organization', definition: 'Teams decide for themselves how best to do their work.' },
        { term: 'Servant leadership', definition: 'Leading by serving the team: removing impediments and enabling people to do their best work.' },
      ],
      quiz: [
        {
          id: 'p2a-beh-1',
          question: 'Which is a PRINCE2 Agile behaviour?',
          options: ['Command and control', 'Transparency', 'Extensive documentation', 'Fixed scope'],
          answerIndex: 1,
          explanation: 'The behaviours are transparency, collaboration, rich communication, self-organization and exploration.',
        },
        {
          id: 'p2a-beh-2',
          question: 'Which behaviour is best supported by displaying a burn chart on the team wall?',
          options: ['Exploration', 'Transparency', 'Self-organization', 'Collaboration'],
          answerIndex: 1,
          explanation: 'Information radiators make progress visible to all, supporting transparency.',
        },
        {
          id: 'p2a-beh-3',
          question: 'In PRINCE2 Agile, what happens to the PRINCE2 principles?',
          options: ['They are replaced by agile values', 'They still apply', 'Only three remain', 'They apply only at delivery level'],
          answerIndex: 1,
          explanation: 'All seven PRINCE2 principles still apply; the agile behaviours complement them.',
        },
        {
          id: 'p2a-beh-4',
          question: 'Which PRINCE2 role does the product owner most commonly relate to?',
          options: ['Executive', 'Senior user (or a customer representative in the team)', 'Project support', 'Senior supplier'],
          answerIndex: 1,
          explanation: 'The product owner represents user needs and prioritizes the backlog, closely linked to the senior user perspective.',
        },
        {
          id: 'p2a-beh-5',
          question: 'What is "rich communication"?',
          options: [
            'Sending detailed reports by email',
            'Communicating face to face and visually where possible',
            'Communicating only through the project manager',
            'Holding long monthly meetings',
          ],
          answerIndex: 1,
          explanation: 'Rich communication uses the most effective channels, typically face to face and visual.',
        },
      ],
    },
    {
      id: 'practices-agile',
      title: 'Practices in an agile context',
      tldr: [
        'Business case: focus on value and the minimum viable product; deliver benefits early.',
        'Plans: product roadmap, releases and sprints; estimate relatively (e.g. story points) and use velocity.',
        'Quality: definition of done and acceptance criteria in user stories.',
        'Progress: burn charts and information radiators; time and cost tolerance often zero, flexing scope instead.',
      ],
      sections: [
        {
          heading: 'Business case and organizing',
          bullets: [
            'The business case states the minimum viable product (what must be delivered for the project to be viable) and the expected benefits.',
            'Frequent releases allow benefits to be realized during the project, not only after it.',
            'Organizing adds agile roles and a strong customer presence in the delivery team.',
          ],
        },
        {
          heading: 'Plans',
          bullets: [
            'Plans are product- and feature-based; a product roadmap shows planned releases.',
            'Relative estimation (e.g. story points, planning poker) is common.',
            'Velocity, the amount of work done per timebox, is used to forecast.',
            'Detailed planning happens just in time, in sprint planning.',
          ],
        },
        {
          heading: 'Quality, risk, issues and progress',
          bullets: [
            'Quality: definition of done (DoD), definition of ready, acceptance criteria, and testing built into every sprint.',
            'Risk: short cycles and frequent feedback reduce risk; daily stand-ups surface risks early.',
            'Issues (change): change is expected. Changes to detailed requirements within tolerance are handled by the team via the backlog; larger changes escalate.',
            'Progress: burn-down and burn-up charts, cumulative flow diagrams, and sprint reviews. Time and cost tolerance are often set to zero, with tolerance on scope instead.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Definition of done', definition: 'A shared set of criteria a product or item must meet before it is considered complete.' },
        { term: 'Velocity', definition: 'The amount of work a team completes in a timebox, used for forecasting.' },
        { term: 'Burn chart', definition: 'A chart showing work remaining (burn-down) or completed (burn-up) over time.' },
        { term: 'Product backlog', definition: 'An ordered list of everything that might be needed in the product.' },
      ],
      quiz: [
        {
          id: 'p2a-pr-1',
          question: 'Which tolerance is typically set to zero in PRINCE2 Agile?',
          options: ['Scope', 'Time and cost', 'Benefits', 'Risk'],
          answerIndex: 1,
          explanation: 'Time and cost are usually fixed (zero tolerance), while tolerance is expressed on what is delivered.',
        },
        {
          id: 'p2a-pr-2',
          question: 'What is "velocity"?',
          options: [
            'How fast a project gets approved',
            'The amount of work a team completes in a timebox',
            'The speed of a release to production',
            'The number of team members',
          ],
          answerIndex: 1,
          explanation: 'Velocity measures work completed per timebox and helps forecast future delivery.',
        },
        {
          id: 'p2a-pr-3',
          question: 'What does a definition of done describe?',
          options: [
            'When a project must close',
            'The criteria a piece of work must meet to be considered complete',
            'The list of all requirements',
            'The project board\'s approval process',
          ],
          answerIndex: 1,
          explanation: 'The DoD is a shared quality standard for completeness.',
        },
        {
          id: 'p2a-pr-4',
          question: 'A change to a detailed requirement is within tolerance. Who can usually handle it?',
          options: ['The business layer', 'The delivery team via the backlog', 'Only the executive', 'Nobody: change is not allowed'],
          answerIndex: 1,
          explanation: 'Change at the detailed level within tolerance is handled at team level; only changes beyond tolerance escalate.',
        },
        {
          id: 'p2a-pr-5',
          question: 'What does a burn-up chart show?',
          options: ['Risks over time', 'Work completed over time', 'The budget per team', 'Team happiness'],
          answerIndex: 1,
          explanation: 'Burn-up charts show work completed (and often total scope) over time.',
        },
        {
          id: 'p2a-pr-6',
          question: 'Why do frequent releases help the business case?',
          options: [
            'They remove the need for a business case',
            'Benefits can be realized earlier, during the project',
            'They increase cost tolerance',
            'They avoid the need for quality checks',
          ],
          answerIndex: 1,
          explanation: 'Releasing often allows value and benefits to arrive earlier.',
        },
      ],
    },
    {
      id: 'focus-areas',
      title: 'Focus areas: Agilometer, requirements and more',
      tldr: [
        'The Agilometer assesses how agile you can safely be, using six sliders.',
        'Requirements are prioritized with MoSCoW: must have, should have, could have, won\'t have this time.',
        'User stories describe needs from the user\'s perspective with acceptance criteria.',
        'Other focus areas: rich communication, frequent releases, and contracts in an agile context.',
      ],
      sections: [
        {
          heading: 'The Agilometer',
          paragraphs: ['A tool to assess risk and tailor how agile the project should be. Its six sliders are:'],
          bullets: [
            'Flexibility on what is delivered.',
            'Level of collaboration.',
            'Ease of communication.',
            'Ability to work iteratively and deliver incrementally.',
            'Advantageous environmental conditions.',
            'Acceptance of agile.',
          ],
        },
        {
          heading: 'Requirements and MoSCoW',
          bullets: [
            'Must have: essential; without it the solution is not viable.',
            'Should have: important but not vital; a workaround may exist.',
            'Could have: desirable; first to be dropped if time is short.',
            'Won\'t have (this time): agreed to be out of scope for now.',
            'User story format: As a <role>, I want <goal>, so that <benefit>.',
            'Large stories (epics) are decomposed into smaller stories.',
          ],
        },
        {
          heading: 'Releases and contracts',
          bullets: [
            'Frequent releases bring early feedback and earlier benefits.',
            'Contracts in agile should support collaboration and flexing scope, rather than fixing every requirement up front.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Agilometer', definition: 'A PRINCE2 Agile tool with six sliders to assess how agile the project environment is.' },
        { term: 'MoSCoW', definition: 'A prioritization technique: must have, should have, could have, won\'t have this time.' },
        { term: 'User story', definition: 'A short description of a need from a user\'s perspective, with acceptance criteria.' },
        { term: 'Epic', definition: 'A large user story that will be broken down into smaller stories.' },
      ],
      quiz: [
        {
          id: 'p2a-fa-1',
          question: 'What is the purpose of the Agilometer?',
          options: [
            'To measure team velocity',
            'To assess how agile a project can be and tailor accordingly',
            'To estimate story points',
            'To calculate benefits',
          ],
          answerIndex: 1,
          explanation: 'The Agilometer helps assess risk and tailor the level of agility.',
        },
        {
          id: 'p2a-fa-2',
          question: 'Which is one of the Agilometer sliders?',
          options: ['Acceptance of agile', 'Size of budget', 'Number of risks', 'Length of sprint'],
          answerIndex: 0,
          explanation: 'Acceptance of agile is one of the six sliders.',
        },
        {
          id: 'p2a-fa-3',
          question: 'In MoSCoW, what does "W" stand for?',
          options: ['Want to have', 'Won\'t have this time', 'Will have', 'Worth having'],
          answerIndex: 1,
          explanation: 'Won\'t have this time: agreed to be out of scope for now.',
        },
        {
          id: 'p2a-fa-4',
          question: 'Which requirements are dropped first when time runs short?',
          options: ['Must have', 'Should have', 'Could have', 'All of them equally'],
          answerIndex: 2,
          explanation: 'Could haves are the first to be dropped to protect the deadline.',
        },
        {
          id: 'p2a-fa-5',
          question: 'What is an epic?',
          options: [
            'A completed release',
            'A large user story that will be broken down',
            'A risk with high impact',
            'The final sprint',
          ],
          answerIndex: 1,
          explanation: 'Epics are big stories decomposed into smaller, deliverable stories.',
        },
      ],
    },
    {
      id: 'frameworks',
      title: 'Scrum and Kanban in depth',
      tldr: [
        'Scrum accountabilities: product owner, scrum master, developers.',
        'Scrum events: sprint, sprint planning, daily scrum, sprint review, sprint retrospective.',
        'Scrum artifacts: product backlog, sprint backlog, increment.',
        'Kanban: visualize the work, limit work in progress (WIP) and actively manage flow.',
      ],
      sections: [
        {
          heading: 'Scrum',
          bullets: [
            'Product owner: maximizes value, owns and orders the product backlog.',
            'Scrum master: establishes Scrum, coaches the team and removes impediments.',
            'Developers: create a usable increment every sprint.',
            'Sprint: a timebox of one month or less, containing all other events.',
            'Daily scrum: a 15-minute event for developers to inspect progress toward the sprint goal.',
            'Sprint review: inspect the increment with stakeholders. Retrospective: improve how the team works.',
            'Commitments: product goal (product backlog), sprint goal (sprint backlog), definition of done (increment).',
          ],
        },
        {
          heading: 'Kanban',
          bullets: [
            'Visualize the workflow on a Kanban board.',
            'Limit work in progress (WIP) to improve flow and reduce multitasking.',
            'Actively manage work items in progress; measure cycle time, throughput and WIP.',
            'Cumulative flow diagrams show work in each state over time.',
            'Little\'s Law: average cycle time = average WIP ÷ average throughput.',
          ],
        },
        {
          heading: 'Lean startup',
          bullets: [
            'Build-measure-learn: build an MVP, measure how users respond, learn and decide to pivot or persevere.',
          ],
        },
      ],
      keyTerms: [
        { term: 'Sprint', definition: 'A fixed timebox of one month or less in which a usable increment is created.' },
        { term: 'WIP limit', definition: 'The maximum number of items allowed in a workflow state at once.' },
        { term: 'Cycle time', definition: 'The elapsed time from when work on an item starts until it is finished.' },
        { term: 'Retrospective', definition: 'An event where the team inspects how it works and plans improvements.' },
      ],
      quiz: [
        {
          id: 'p2a-fw-1',
          question: 'Which is a Scrum artifact?',
          options: ['Product backlog', 'Risk register', 'Highlight report', 'Business case'],
          answerIndex: 0,
          explanation: 'Scrum artifacts: product backlog, sprint backlog and increment.',
        },
        {
          id: 'p2a-fw-2',
          question: 'What is the maximum length of a sprint according to the Scrum Guide?',
          options: ['One week', 'Two weeks', 'One month', 'Three months'],
          answerIndex: 2,
          explanation: 'Sprints are one month or less.',
        },
        {
          id: 'p2a-fw-3',
          question: 'What is the main purpose of a WIP limit in Kanban?',
          options: [
            'To increase the number of tasks started',
            'To improve flow by limiting work in progress',
            'To fix the project budget',
            'To replace the backlog',
          ],
          answerIndex: 1,
          explanation: 'Limiting WIP reduces multitasking and bottlenecks, improving flow.',
        },
        {
          id: 'p2a-fw-4',
          question: 'Which Scrum event focuses on improving how the team works?',
          options: ['Sprint review', 'Sprint retrospective', 'Daily scrum', 'Sprint planning'],
          answerIndex: 1,
          explanation: 'The retrospective inspects people, processes and tools and plans improvements.',
        },
        {
          id: 'p2a-fw-5',
          question: 'Who orders the product backlog in Scrum?',
          options: ['Scrum master', 'Developers', 'Product owner', 'Project board'],
          answerIndex: 2,
          explanation: 'The product owner is accountable for the product backlog and its ordering.',
        },
        {
          id: 'p2a-fw-6',
          question: 'According to Little\'s Law, what happens to average cycle time if WIP rises while throughput stays the same?',
          options: ['It decreases', 'It increases', 'It stays the same', 'It becomes zero'],
          answerIndex: 1,
          explanation: 'Cycle time = WIP ÷ throughput, so more WIP with the same throughput means longer cycle time.',
        },
        {
          id: 'p2a-fw-7',
          question: 'How long is the daily scrum?',
          options: ['5 minutes', '15 minutes', '30 minutes', '1 hour'],
          answerIndex: 1,
          explanation: 'The daily scrum is a 15-minute event for the developers.',
        },
      ],
    },
  ],
}
