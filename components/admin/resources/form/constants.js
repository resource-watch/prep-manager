export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  partners: [],
  form: {
    // STEP 1
    title: '',
    description: '',
    url: '',
    photo: ''
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

export const RESOURCES_TYPES = [
  {
    label: 'Understanding Climate Change Impacts',
    value: 'Understanding Climate Change Impacts'
  }, {
    label: 'Climate Assessment & Preparedness Tools',
    value: 'Climate Assessment & Preparedness Tools'
  },
  {
    label: 'Climate Data Portals',
    value: 'Climate Data Portals'
  },
  {
    label: 'Multi-resource Platforms',
    value: 'Multi-resource Platforms'
  }
];
