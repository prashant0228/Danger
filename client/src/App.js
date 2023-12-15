import React from 'react';
import HomePage from './Pages/HomePage';
import {  Routes, Route } from "react-router-dom";
import { Dashboard } from './Pages/Dashboard';
import { Navbar } from './Components/Navbar';
import { Chi } from './Pages/Chi';
import Pearson from './Components/Pearson';
// import Normalization from './Pages/Normalization';
import CSVUploadAndDisplay from './Components/CSVUploadAndDisplay';
import Classifier from './Pages/Classifier';
import OtherClassifier from './Pages/OtherClassifier';
import DendrogramDisplay from './Components/DendrogramDisplay';
import Kmeans from './Pages/Kmeans';
import Vkmeans from './Pages/Vkmeans';
import Kmedoids from './Pages/Kmedoids';
import BIRCH from './Pages/BIRCH';
import DBSCAN from './Pages/DBSCAN';
// import ClusterValidation from './Pages/ClusterValidation';
import ClusteringForm from './Pages/ClusteringForm';
import Task1 from './Pages/ass7/Task1';
import Ass6 from './Pages/Ass6';
// import Task2 from './Pages/ass7/Task2';
import Ass8 from './Pages/ass8/Ass8';
import Crawl from './Pages/ass8/Crawl';
import HitScore from './Pages/ass8/HitScores';
import PageRank from './Pages/ass8/PageRank';
import Ass2 from './Pages/Ass2/Ass2';
import PredictDiseases from '../src/Pages/ass9/ass9'



function App() {
  return (
<>
      <Navbar />
      <div className="App pt-16 background-image"> {/* Add padding top to push content below navbar */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route exact path="/ass2" element={<Ass2 />} />
          {/* <Route exact path="/chi" element={<Chi />} />
          <Route exact path="/pearson" element={<Pearson />} />
          <Route exact path="/normalization" element={<CSVUploadAndDisplay/>} /> */}
          <Route exact path="/ass2/chi" element={<Chi />} />
          <Route exact path="/ass2/pearson" element={<Pearson />} />
          <Route exact path="/ass2/normalization" element={<CSVUploadAndDisplay/>} />

          <Route exact path="/classifier" element={<Classifier/>} />
          <Route exact path="/otherClassifier" element={<OtherClassifier/>} />
          
          <Route exact path="/ass6" element={<Ass6/>} />
          {/* <Route exact path="/kmeans" element={<Kmeans/>} />
          <Route exact path="/vkmeans" element={<Vkmeans/>} />
          <Route exact path="/kmedoids" element={<Kmedoids/>} />
          <Route exact path='/birch' element={<BIRCH/>} />
          <Route exact path='/dbscan' element={<DBSCAN/>} />
        <Route exact path='/ClusterValidation' element={<ClusteringForm/>} /> */}
        <Route exact path="/ass6/dendrogram" element={<DendrogramDisplay/>} />
          <Route exact path="/ass6/kmeans" element={<Kmeans/>} />
          <Route exact path="/ass6/vkmeans" element={<Vkmeans/>} />
          <Route exact path="/ass6/kmedoids" element={<Kmedoids/>} />
          <Route exact path='/ass6/birch' element={<BIRCH/>} />
          <Route exact path='/ass6/dbscan' element={<DBSCAN/>} />
          <Route exact path='/ass6/ClusterValidation' element={<ClusteringForm/>} />

          <Route exact path="/ass7" element={<Task1/>} />
          <Route exact path="/ass8" element={<Ass8/>} />

          <Route exact path="/ass8/crawl" element={<Crawl/>} />
          <Route exact path="/ass8/hitscore" element={<HitScore/>} />
          <Route exact path="/ass8/pagerank" element={<PageRank/>} />
          <Route exact path="/ass9" element={<PredictDiseases />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
