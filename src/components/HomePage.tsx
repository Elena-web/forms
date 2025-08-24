//import { useState } from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  //   const [activeForm, setActiveForm] = useState<'uncontrolled' | 'hook' | ''>(
  //     ''
  //   );

  return (
    <div className="layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>

      <main>
        <div className="form-selector">
          <h2>Select a form type</h2>
          <div className="button-group">
            <button>Uncontrolled Form</button>
            <button>React Hook Form</button>
          </div>
        </div>
        <div className="form-render"></div>
      </main>
    </div>
  );
}
