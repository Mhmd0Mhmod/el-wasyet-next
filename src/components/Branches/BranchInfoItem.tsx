interface BranchInfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}
function BranchInfoItem({ icon, title, value }: BranchInfoItemProps) {
  return (
    <div className="text-center space-y-3">
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  );
}
export default BranchInfoItem;
