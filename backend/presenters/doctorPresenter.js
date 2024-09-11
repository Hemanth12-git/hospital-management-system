function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

class DoctorPresenter {
  constructor(model) {
      this.model = model;
  }

  toJSON() {
      const doctorData = this.model;
      return {
          id: Number(doctorData.id) || 1,
          name: toTitleCase(doctorData.name || ''),
          specialization: toTitleCase(doctorData.specialization || ''),
      };
  }

  toJSONNameAndId() {
      const doctorData = this.model;
      return {
          id: Number(doctorData.id) || 1,
          name: toTitleCase(doctorData.name || ''),
      };
  }
}

module.exports = DoctorPresenter;
