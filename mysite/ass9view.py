from django.shortcuts import render
from django.http import JsonResponse
from .forms import SymptomForm
import pandas as pd
import joblib
from mysite.models import Symptom


# Load the trained model
model = joblib.load('mysite/healthcare_model.joblib')

def predict_disease(request):
    if request.method == 'POST':
        form = SymptomForm(request.POST)
        if form.is_valid():
            # Preprocess symptoms (similar to how you preprocessed during training)
            symptoms = form.cleaned_data['symptoms'].split(',')
            # Assuming you have a preprocessor function for symptoms
            # You need to implement preprocess_symptoms based on your preprocessing during training
            preprocessed_symptoms = preprocess_symptoms(symptoms)

            # Make prediction using the trained model
            prediction = model.predict([preprocessed_symptoms])

            # Get the predicted disease
            predicted_disease = prediction[0]

            return JsonResponse({'prediction': predicted_disease})
    else:
        form = SymptomForm()

    return render(request, './client/src/Pages/ass9/ass9.jsx', {'form': form})
