export default function Msg({ msg }: { msg: string }) {
  return (
    <div className="bg-green-600 py-4 px-8 rounded-lg font-bold animate-emerge fixed right-4 bottom-4">
      {msg}
    </div>
  );
}
