export default function MsgBox({ msg }: { msg: string }) {
  return (
    <div className="fixed right-4 bottom-4 px-4 py-2 font-bold rounded-md bg-green-600 animate-emerge">
      {msg}
    </div>
  );
} 
