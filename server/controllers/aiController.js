// @desc    Analyze symptoms and provide recommendation
// @route   POST /api/ai/analyze
// @access  Public (or Private if needed)
const analyzeSymptoms = async (req, res) => {
    try {
        const { symptoms } = req.body;

        if (!symptoms) {
            return res.status(400).json({ message: 'Please describe your symptoms' });
        }

        // Mock AI Logic (Simulate delay)
        await new Promise(resolve => setTimeout(resolve, 1500));

        const lowerSymptoms = symptoms.toLowerCase();
        let diagnosis = "General Health Issue";
        let recommendation = "Please visit a general physician for a thorough checkup.";
        let riskLevel = "Low"; // Low, Medium, High
        let specialization = "General Physician";

        // Rule-based Logic
        if (lowerSymptoms.includes('chest pain') || lowerSymptoms.includes('heart') || lowerSymptoms.includes('breathing')) {
            diagnosis = "Possible Angina or Cardiac Issue";
            recommendation = "URGENT: Seek immediate medical attention. Avoid exertion.";
            riskLevel = "High";
            specialization = "Cardiologist";
        }
        else if (lowerSymptoms.includes('headache') && (lowerSymptoms.includes('vomiting') || lowerSymptoms.includes('vision'))) {
            diagnosis = "Possible Migraine or Neurological Issue";
            recommendation = "Rest in a dark room. Consult a neurologist if symptoms persist.";
            riskLevel = "Medium";
            specialization = "Neurologist";
        }
        else if (lowerSymptoms.includes('fever') && lowerSymptoms.includes('headache')) {
            diagnosis = "Possible Viral Fever or Flu";
            recommendation = "Stay hydrated, take rest, and monitor temperature.";
            riskLevel = "Medium";
            specialization = "General Physician";
        }
        else if (lowerSymptoms.includes('stomach') || lowerSymptoms.includes('abdominal') || lowerSymptoms.includes('pain')) {
            diagnosis = "Possible Gastritis or Digestive Issue";
            recommendation = "Avoid spicy food. Drink plenty of water.";
            riskLevel = "Low";
            specialization = "Gastroenterologist";
        }
        else if (lowerSymptoms.includes('skin') || lowerSymptoms.includes('rash') || lowerSymptoms.includes('itch')) {
            diagnosis = "Possible Dermatitis or Allergy";
            recommendation = "Avoid scratching. Apply soothing lotion.";
            riskLevel = "Low";
            specialization = "Dermatologist";
        }
        else if (lowerSymptoms.includes('eye') || lowerSymptoms.includes('vision') || lowerSymptoms.includes('redness')) {
            diagnosis = "Possible Conjunctivitis or Eye Strain";
            recommendation = "Wash eyes with cold water. Reduce screen time.";
            riskLevel = "Low";
            specialization = "Ophthalmologist";
        }
        else if (lowerSymptoms.includes('bone') || lowerSymptoms.includes('joint') || lowerSymptoms.includes('fracture')) {
            diagnosis = "Possible Orthopedic Issue";
            recommendation = "Restrict movement. Apply ice if swollen.";
            riskLevel = "Medium";
            specialization = "Orthopedist";
        }

        res.status(200).json({
            success: true,
            data: {
                diagnosis,
                recommendation,
                riskLevel,
                specialization
            }
        });

    } catch (error) {
        console.error("AI Analysis Error:", error);
        res.status(500).json({
            success: false,
            message: 'Error analyzing symptoms',
            error
        });
    }
};

module.exports = {
    analyzeSymptoms
};
