// Home.tsx
import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import NumbersList from "../components/NumbersList";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";

interface NumberData {
  _id: string;
  number: number;
  date: string;
}

const Home: React.FC = () => {
  const [numbers, setNumbers] = useState<NumberData[]>([]);

  const addNumberToList = (number: NumberData) => {
    setNumbers((prevNumbers) => [...prevNumbers, number]);
  };

  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <NumbersList numbers={numbers} addNumberToList={addNumberToList} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
