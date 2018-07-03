export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  dataset: {},
  form: {
    // STEP 1
    title: '',
    summary: '',
    content: '',
    // Images
    image: '',
    user_id: null,
    // States
    published: false
  }
};

export const FORM_ELEMENTS = {
  elements: {
  },
  validate() {
    const elements = this.elements;
    Object.keys(elements).forEach((k) => {
      elements[k].validate();
    });
  },
  isValid() {
    const elements = this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};

export const TEMPLATES = [
  {
    label: 'Default',
    value: 'default',
    content: [
      { id: 1530625866277, type: 'text', content: '<h1>This is a title</h1>' },
      { id: 1530625884504, type: 'grid', content: [null, null] }
    ]
  },
  {
    label: 'Alternate',
    value: 'alternate',
    content: [
      { id: 1530625964227, type: 'text', content: '<h1>This is a title</h1>' },
      { id: 1530625977526, type: 'grid', content: [[{ id: 1530625980396, type: 'text', content: '<h2>Hello this is this subtitle</h2><p><br></p><p>The Climate Partnership for Resilience and Preparedness (C-PREP) is a public-private collaboration whose mission is to help planners, investors, and resource managers around the globe rapidly assess and incorporate climate risks into their decisions by enhancing access to the best available data, and stories on climate change. Climate assessments have traditionally focused on building the case for climate action by publishing static written reports. Users of climate risk data have depended on science ‘translators’ to communicate key messages from assessments and related reports, without having direct access to the underlying data sets.</p><p><br></p><p><span style="color: rgb(36, 41, 46);">Today, with growing demand to manage climate risks, assessments need to move beyond making the case for action through words and pictures, to enabling action by guiding users to relevant data and tools. To meet this need, C-PREP will leverage innovations in information and communication technology to enable climate assessment and planning teams to easily develop on-line reports with direct access to useable, continuously updated information, through customizable modern web and mobile apps. It will also provide the building blocks for countries, states, and communities to develop their own climate-risk dashboards: customized online sites containing data, information, tools, and other dynamic resources needed to mainstream climate-risk information into planning and investment decisions.</span></p>' }], [{ id: 1530626037884, type: 'widget', content: { widgetId: 'f2fbd06e-8e2e-4b06-a883-0e4c1146c79c', categories: [] } }]] },
      { id: 1530626117398, type: 'grid', content: [[{ id: 1530626127803, type: 'widget', content: { widgetId: 'f2fbd06e-8e2e-4b06-a883-0e4c1146c79c', categories: [] } }], [{ id: 1530626131946, type: 'text', content: '<h2>Hello this is this subtitle</h2><p><br></p><p>The Climate Partnership for Resilience and Preparedness (C-PREP) is a public-private collaboration whose mission is to help planners, investors, and resource managers around the globe rapidly assess and incorporate climate risks into their decisions by enhancing access to the best available data, and stories on climate change. Climate assessments have traditionally focused on building the case for climate action by publishing static written reports. Users of climate risk data have depended on science ‘translators’ to communicate key messages from assessments and related reports, without having direct access to the underlying data sets.</p><p><br></p><p><span style="color: rgb(36, 41, 46);">Today, with growing demand to manage climate risks, assessments need to move beyond making the case for action through words and pictures, to enabling action by guiding users to relevant data and tools. To meet this need, C-PREP will leverage innovations in information and communication technology to enable climate assessment and planning teams to easily develop on-line reports with direct access to useable, continuously updated information, through customizable modern web and mobile apps. It will also provide the building blocks for countries, states, and communities to develop their own climate-risk dashboards: customized online sites containing data, information, tools, and other dynamic resources needed to mainstream climate-risk information into planning and investment decisions.<span class="ql-cursor">﻿</span></span></p>' }]] }
    ]
  }
];
