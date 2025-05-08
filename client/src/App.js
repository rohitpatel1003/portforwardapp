import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  const [services, setServices] = useState([]);

  const fetchStatus = async () => {
    const res = await fetch('http://localhost:4000/status');
    const data = await res.json();
    setServices(data);
  };

  const toggle = async (id, running) => {
    await fetch(`http://localhost:4000/${running ? 'stop' : 'start'}/${id}`, { method: 'POST' });
    fetchStatus();
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '20px', 
        backgroundColor: '#f8f9fc', 
        borderRadius: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
      }}>
        <img
          src={`${process.env.PUBLIC_URL}/kubernetes-port-forward-command.png`}
          alt="Kubernetes Port Forward"
          style={{ width: '80px', height: '80px', marginRight: '20px' }}
        />
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
          Port Forward Dashboard
        </h1>
      </div>

      {services.map(group => (
        <div key={group.category} style={{ marginBottom: '30px' }}>
        <h3 style={{ borderLeft: '4px solid #007bff', paddingLeft: '10px' }}>{group.category}</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px', 
          marginTop: '15px' 
        }}>
          {group.services.map(service => (
            <div key={service.id} className="card">
              <div className="service-info">
                <div>
                  <h4>{service.name}</h4>
                  <p>
                    Port: {service.port}{" "}
                    {service.running && (
                      <a
                        href={`http://localhost:${service.port}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginLeft: '10px' }}
                      >
                        Open <i className="fa-solid fa-arrow-up-right-from-square" style={{ marginLeft: '4px' }}></i>
                      </a>
                    )}
                  </p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={service.running}
                    onChange={() => toggle(service.id, service.running)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      ))}

    </div>
  );
}

export default App;