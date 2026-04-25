"use server";

export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateLead(name: string, email: string): EnquiryFormState | null {
  if (!name || !email) {
    return {
      status: "error",
      message: "Please add your name and email so Cervantes can respond.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  return null;
}

export async function submitContactEnquiry(
  _previousState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const name = textField(formData, "name");
  const email = textField(formData, "email");
  const validationError = validateLead(name, email);

  if (validationError) {
    return validationError;
  }

  const payload = {
    source: textField(formData, "source") || "contact-page",
    name,
    email,
    phone: textField(formData, "phone"),
    interest: textField(formData, "interest"),
    message: textField(formData, "message"),
    submittedAt: new Date().toISOString(),
  };

  console.info("[Cervantes contact enquiry]", payload);

  return {
    status: "success",
    message: "Thank you. Your brief has been received and the Cervantes team will be in touch shortly.",
  };
}

export async function submitPropertyEnquiry(
  _previousState: EnquiryFormState,
  formData: FormData
): Promise<EnquiryFormState> {
  const name = textField(formData, "name");
  const email = textField(formData, "email");
  const validationError = validateLead(name, email);

  if (validationError) {
    return validationError;
  }

  const payload = {
    source: textField(formData, "source") || "property-detail",
    mode: textField(formData, "mode"),
    name,
    email,
    phone: textField(formData, "phone"),
    message: textField(formData, "message"),
    propertyTitle: textField(formData, "propertyTitle"),
    propertyReference: textField(formData, "propertyReference"),
    propertySlug: textField(formData, "propertySlug"),
    advisorEmail: textField(formData, "advisorEmail"),
    submittedAt: new Date().toISOString(),
  };

  console.info("[Cervantes property enquiry]", payload);

  return {
    status: "success",
    message: "Thank you. Your property enquiry has been received and Jennifer will follow up shortly.",
  };
}
