function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

class DiagnosisPresenter {
  constructor(model) {
      this.model = model;
  }

  toJSON() {
      const diagnosisData = this.model;
      return {
          id: Number(diagnosisData.id) || 1,
          disease: toTitleCase(diagnosisData.disease || ''),
          severity: diagnosisData.severity || '',
          prescription: diagnosisData.prescription || [],
          additional_info: diagnosisData.additional_info || '',
      };
  }

  toJSONNameAndId() {
      const diagnosisData = this.model;
      return {
          id: Number(diagnosisData.id) || 1,
          disease: toTitleCase(diagnosisData.disease || ''),
      };
  }
}

module.exports = DiagnosisPresenter;
