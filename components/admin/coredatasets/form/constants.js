export const STATE_DEFAULT = {
  step: 1,
  stepLength: 1,
  submitting: false,
  loading: false,
  coreDatasets: [],
  form: {
    // STEP 1
    title: '',
    subcategory: 'Temperature',
    dataset_ids: [],
    slugs: []
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

export const CATEGORIES = [{
  name: 'Climate',
  subcategories: [
    { label: 'Temperature', value: 'Temperature' },
    { label: 'Precipitations', value: 'Precipitations' },
    { label: 'Extreme events', value: 'Extreme events'},
    { label: 'Coastal risk', value: 'Coastal risk'},
    { label: 'Water risk', value: 'Water risk'}
  ]
}, {
  name: 'Exposure',
  subcategories: [
    { label: 'People', value: 'People' },
    { label: 'Agriculture', value: 'Agriculture' },
    { label: 'Infrastructure', value: 'Infrastructure'}
  ]
}, {
  name: 'Vulnerability',
  subcategories: [
    { label: 'Socioeconomic', value: 'Socioeconomic' },
    { label: 'Indices of vulnerability', value: 'Indices of vulnerability' }
  ]
}, {
  name: 'Physical Features',
  subcategories: [
    { label: 'Administrative Boundaries', value: 'Administrative Boundaries' },
    { label: 'Land', value: 'Land' },
    { label: 'Water', value: 'Water'}
  ]
}];
