const contactList = [
  {
    id: 1,
    first: "Madhusha",
    last: "Prasad",
    avatar:
      "https://avatars.githubusercontent.com/u/50085447?s=400&u=216e31baa9c6b5b224f0943921a7b04aba2915ce&v=4",
    twitter: "MadhushaPrasad",
    notes: "Dont't trust anyone",
    favorite: true,
  },
];

export const getContacts = () => {
  return contactList;
};

export const getContact = (id: number) => {
  return contactList.find((contact) => contact.id === id);
};

export type ContactRecord = {
  id: number;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};
