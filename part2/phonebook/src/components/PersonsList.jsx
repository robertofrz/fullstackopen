import PersonCard from "./PersonCard";

function PersonsList({ filteredNames, handleDelete }) {
  return (
    <ul>
      {filteredNames.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          handleDelete={() => handleDelete({ person })}
        />
      ))}
    </ul>
  );
}
export default PersonsList;
