const ids: string[] = [];

export default function() {
  const generateId = (): string => {
    let id: string;

    do {
      id = Math.random().toString(36).substring(2, 10);
    } while (ids.includes(id));

    ids.push(id);
    return id;
  };

  return {
    generateId
  };
}
