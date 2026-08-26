import "./App.css";
import {useEffect} from 'react';

import { getAll } from './services/tarea.service';

function App() {
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const response = await getAll();
        console.log("Tasks: ", response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    cargarTareas();
  },[]);
}
