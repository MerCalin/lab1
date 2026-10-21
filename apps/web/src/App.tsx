type Entrance =  {
  id: number;
  address: string;
  floors: number;
  hasElevator: boolean;
};

const sample: Entrance[] = [
  { id: 1, address: "123 Main St", floors: 5, hasElevator: true },
  { id: 2, address: "456 Elm St", floors: 3, hasElevator: false },
];

function EntranceItem({ entrance }: { entrance: Entrance }) {
  return (
    <li>
      {entrance.address} - {entrance.floors} floors
      {entrance.hasElevator ? " (elevator)" : ""}
    </li>
  );
}

export default function App(){
  return (
    <main>
      <h1>Entrances</h1>
      <ul>
        {sample.map((entrance) => (
          <EntranceItem key={entrance.id} entrance={entrance} />
        ))}
      </ul>
    </main>
  );
}