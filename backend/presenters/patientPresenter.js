function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

class PatientPresenter {
  constructor(model) {
      this.model = model;
  }

  toJSON() {
      const patientData = this.model;
      return {
          id: Number(patientData.id) || 1,
          name: toTitleCase(patientData.name || ''),
          age: Number(patientData.age) || 0,
          gender: (patientData.gender || '').toUpperCase(),
          doctor_id: Number(patientData.doctor_id) || null,
          diagnosis_id: Number(patientData.diagnosis_id) || null,
      };
  }

  toJSONNameAndId() {
      const patientData = this.model;
      return {
          id: Number(patientData.id) || 1,
          name: toTitleCase(patientData.name || ''),
      };
  }
}

module.exports = PatientPresenter;
