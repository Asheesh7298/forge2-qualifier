import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API = 'http://127.0.0.1:8000/api';

export default function App() {
  const [boards, setBoards] = useState([]);
  const [activeBoard, setActiveBoard] = useState(null);
  const [members, setMembers] = useState([]);
  const [tags, setTags] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [newListName, setNewListName] = useState('');

  useEffect(() => {
    loadBoards();
    axios.get(`${API}/members`).then(r => setMembers(r.data));
    axios.get(`${API}/tags`).then(r => setTags(r.data));
  }, []);

  const loadBoards = () => axios.get(`${API}/boards`).then(r => setBoards(r.data));

  const openBoard = (id) => axios.get(`${API}/boards/${id}`).then(r => setActiveBoard(r.data));

  const createBoard = async () => {
    if (!newBoardName.trim()) return;
    await axios.post(`${API}/boards`, { name: newBoardName });
    setNewBoardName('');
    loadBoards();
  };

  const createList = async () => {
    if (!newListName.trim() || !activeBoard) return;
    await axios.post(`${API}/lists`, { name: newListName, board_id: activeBoard.id });
    setNewListName('');
    openBoard(activeBoard.id);
  };

  const createCard = async (listId) => {
    const title = prompt('Card title:');
    if (!title) return;
    await axios.post(`${API}/cards`, { title, board_list_id: listId });
    openBoard(activeBoard.id);
  };

  const moveCard = async (card, newListId) => {
    await axios.put(`${API}/cards/${card.id}`, { board_list_id: newListId });
    openBoard(activeBoard.id);
  };

  const assignMember = async (card, memberId) => {
    await axios.put(`${API}/cards/${card.id}`, { member_id: memberId || null });
    openBoard(activeBoard.id);
  };

  const setDueDate = async (card, date) => {
    await axios.put(`${API}/cards/${card.id}`, { due_date: date || null });
    openBoard(activeBoard.id);
  };

  const attachTag = async (card, tagId) => {
    await axios.post(`${API}/cards/${card.id}/tags`, { tag_id: tagId });
    openBoard(activeBoard.id);
  };

  const isOverdue = (card) => card.due_date && new Date(card.due_date) < new Date();

  if (!activeBoard) {
    return (
      <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
        <h1>Boards</h1>
        <input value={newBoardName} onChange={e => setNewBoardName(e.target.value)} placeholder="New board name" />
        <button onClick={createBoard}>Create Board</button>
        <ul>
          {boards.map(b => (
            <li key={b.id}>
              <button onClick={() => openBoard(b.id)}>{b.name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <button onClick={() => setActiveBoard(null)}>← Back to Boards</button>
      <h1>{activeBoard.name}</h1>
      <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="New list name" />
      <button onClick={createList}>Add List</button>

      <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
        {activeBoard.board_lists?.map(list => (
          <div key={list.id} style={{ background: '#f0f0f0', padding: 12, minWidth: 250, borderRadius: 8 }}>
            <h3>{list.name}</h3>
            <button onClick={() => createCard(list.id)}>+ Add Card</button>
            {list.cards?.map(card => (
              <div key={card.id} style={{
                background: isOverdue(card) ? '#ffdddd' : 'white',
                margin: '8px 0', padding: 8, borderRadius: 6, border: '1px solid #ccc'
              }}>
                <strong>{card.title}</strong>
                {isOverdue(card) && <span style={{ color: 'red' }}> ⚠ Overdue</span>}
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  <div>
                    Move to:
                    <select onChange={e => moveCard(card, e.target.value)} defaultValue="">
                      <option value="" disabled>select list</option>
                      {activeBoard.board_lists.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    Member:
                    <select onChange={e => assignMember(card, e.target.value)} defaultValue={card.member_id || ''}>
                      <option value="">none</option>
                      {members.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    Due: <input type="date" defaultValue={card.due_date || ''} onChange={e => setDueDate(card, e.target.value)} />
                  </div>
                  <div>
                    Tags:
                    <select onChange={e => attachTag(card, e.target.value)} defaultValue="">
                      <option value="" disabled>add tag</option>
                      {tags.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                    {card.tags?.map(t => (
                      <span key={t.id} style={{ background: t.color || '#ddd', padding: '2px 6px', borderRadius: 4, marginLeft: 4 }}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}