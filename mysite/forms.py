from django import forms

class SymptomForm(forms.Form):
    symptoms = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Enter symptoms separated by commas'}))