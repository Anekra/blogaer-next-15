import React from 'react';
import { FieldError } from 'react-hook-form';

export default function FormIndicator({
  fieldError,
  value,
  formType
}: {
  fieldError: FieldError | undefined;
  value: string;
  formType: string;
}) {
  if (fieldError?.message) {
    return <p className="text-lg text-green-500">❗</p>;
  } else if (!fieldError && value && formType === 'register') {
    return <p className="text-lg text-green-500">✔</p>;
  }
}
