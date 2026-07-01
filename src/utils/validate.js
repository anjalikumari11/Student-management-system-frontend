export const emptyStudent = {
  name: '',
  email: '',
  phone: '',
  course: '',
  address: '',
};

export const validateStudentForm = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = 'Name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  if (!data.course.trim()) errors.course = 'Course is required';
  if (!data.address.trim()) errors.address = 'Address is required';

  return errors;
};

export const isFormValid = (data) => Object.keys(validateStudentForm(data)).length === 0;
