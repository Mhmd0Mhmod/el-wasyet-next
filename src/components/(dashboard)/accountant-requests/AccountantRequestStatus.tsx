function RequestStatus({ status }: { status: string }) {
  const translatedStatus = {
    Pending: "قيد الانتظار",
    Approved: "تمت الموافقة",
    Rejected: "تم الرفض",
  };

  return (
    <span>
      {translatedStatus[status as keyof typeof translatedStatus] || status}
    </span>
  );
}

export default RequestStatus;
