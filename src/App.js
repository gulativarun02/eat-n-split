import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clarksz",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isSelected, setIsSelected] = useState(null);
  const [showAddFriend, setShowAddFriend] = useState(true);

  function selectFriend(friend) {
    setIsSelected((isSelected) =>
      friend.id === isSelected?.id ? (isSelected = null) : (isSelected = friend)
    );
  }

  function handleSubmit(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === isSelected?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setIsSelected(null);
  }

  function handleNewFriend(friend, friendName) {
    const noDuplicate = friends.every((friend) => friend.name !== friendName);
    if (noDuplicate) setFriends((friends) => [...friends, friend]);
    toggleAddFriend();
  }

  function toggleAddFriend() {
    setShowAddFriend((showAddFriend) => (showAddFriend = !showAddFriend));
  }

  return (
    <div className="app">
      <FriendsSection
        selectFriend={selectFriend}
        friends={friends}
        isSelected={isSelected}
        onHandleNewFriend={handleNewFriend}
        showAddFriend={showAddFriend}
        onToggleAddFriend={toggleAddFriend}
      />
      <Form
        onSplitBill={handleSubmit}
        isSelected={isSelected}
        key={isSelected?.id}
      />
    </div>
  );
}

function FriendsSection({
  friends,
  onHandleNewFriend,
  selectFriend,
  isSelected,
  showAddFriend,
  onToggleAddFriend,
}) {
  return (
    <div className="friends-section">
      <FriendsList
        selectFriend={selectFriend}
        friends={friends}
        isSelected={isSelected}
      />
      {showAddFriend ? (
        <>
          <AddFriend onHandleNewFriend={onHandleNewFriend} />
          <button onClick={onToggleAddFriend} className="add-btn">
            Close
          </button>
        </>
      ) : (
        <button onClick={onToggleAddFriend} className="add-btn">
          Add a friend
        </button>
      )}
    </div>
  );
}

function FriendsList({ friends, selectFriend, isSelected }) {
  return (
    <>
      <div className="friendsList">
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            selectFriend={selectFriend}
            isSelected={isSelected}
          />
        ))}
      </div>
    </>
  );
}

function Friend({ friend, selectFriend, isSelected }) {
  function renderStatsColor() {
    if (friend.balance > 0) return { color: "var(--color-green)" };
    if (friend.balance < 0) return { color: "var(--color-red)" };
    if ((friend.balance = 0)) return {};
  }

  function renderStatsText() {
    if (friend.balance > 0) return `${friend.name} owes you $${friend.balance}`;
    if (friend.balance < 0)
      return `You owe ${friend.name} $${Math.abs(friend.balance)}`;
    if (friend.balance === 0) return `You and ${friend.name} are even`;
  }

  return (
    <div
      className="friend"
      style={
        isSelected?.id === friend.id
          ? { backgroundColor: "var(--color-light)" }
          : {}
      }
    >
      <div className="friend__inner">
        <img className="friend__image" src={friend.image} alt={friend.name} />
        <div>
          <p className="friend__name">{friend.name}</p>
          <p className="stats" style={renderStatsColor()}>
            {renderStatsText()}
          </p>
        </div>
      </div>
      <Button
        friend={friend}
        onClick={() => selectFriend(friend)}
        myClassName="friends__btn"
      >
        {isSelected?.id === friend.id ? "Close" : "Select"}
      </Button>
    </div>
  );
}

function AddFriend({ onHandleNewFriend }) {
  const randomId = crypto.randomUUID();
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState(`https://i.pravatar.cc/48`);

  function addNewFriend(e) {
    e.preventDefault();

    if (!friendName || !friendImage) return;
    const newFriend = {
      name: friendName,
      image: `${friendImage}?=${randomId}`,
      balance: 0,
      id: randomId,
    };
    onHandleNewFriend(newFriend, friendName);
    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48?=");
  }
  return (
    <div className="add-friend-form">
      <form onSubmit={addNewFriend}>
        <label>🧑‍🤝‍🧑 Friend name</label>
        <input
          value={friendName}
          onChange={(e) => setFriendName(e.target.value)}
          className="input-friend-name"
          type="text"
        />
        <label>🖼️ Image URL</label>
        <input
          value={friendImage}
          onChange={(e) => setFriendImage(e.target.value)}
          type="text"
        />
        <button className="add-btn">Add</button>
      </form>
    </div>
  );
}

function Form({ isSelected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [payer, setPayer] = useState("");
  const [myExpense, setMyExpense] = useState("");

  const friendExpense = bill - myExpense;

  function splitBill(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;

    onSplitBill(payer === isSelected.name ? -myExpense : friendExpense);

    setBill("");
    setMyExpense("");
    setPayer("");
  }

  if (isSelected)
    return (
      <div className="form">
        <h2>Split a bill with {isSelected.name}</h2>
        <form onSubmit={(e) => splitBill(e)}>
          <label>💰 Bill value</label>
          <input
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            type="text"
          />

          <label>🙋‍♂️ Your expense</label>
          <input
            value={myExpense}
            onChange={(e) => setMyExpense(Number(e.target.value))}
            type="text"
          />

          <label>🧑‍🤝‍🧑 {isSelected.name}'s Expense</label>
          <input
            value={friendExpense}
            className="input-disabled"
            type="text"
            disabled
          />

          <label>🤑 Who is paying the bill?</label>
          <select value={payer} onChange={(e) => setPayer(e.target.value)}>
            <option value="You">You</option>
            <option>{isSelected.name}</option>
          </select>
          <button className="split-btn">Split Bill</button>
        </form>
      </div>
    );
}

function Button({ children, myClassName, onClick, friend }) {
  return (
    <button onClick={() => onClick(friend)} className={myClassName}>
      {children}
    </button>
  );
}
