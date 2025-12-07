let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET) avec pagination
function getAssignments(req, res){
    // Récupérer les paramètres de pagination depuis les query params
    let aggregateQuery = Assignment.aggregate();
    
    Assignment.aggregatePaginate(
        aggregateQuery,
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
        },
        (err, assignments) => {
            if(err){
                console.error('Erreur getAssignments:', err);
                res.status(500).json({error: err.message});
            } else {
                res.json(assignments);
            }
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    console.log("GET assignment avec ID:", req.params.id);
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){
            console.error('Erreur getAssignment:', err);
            res.status(500).json({error: err.message});
            return;
        }
        if (!assignment) {
            console.log('Assignment non trouvé:', assignmentId);
            res.status(404).json({error: 'Assignment non trouvé'});
            return;
        }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    console.log("POST assignment reçu");
    let assignment = new Assignment();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu || false;

    console.log("Données reçues:", assignment)

    assignment.save( (err, saved) => {
        if(err){
            console.error('Erreur postAssignment:', err);
            res.status(500).json({error: err.message});
            return;
        }
        console.log("Assignment sauvegardé:", saved.nom);
        res.json({ message: `${assignment.nom} saved!`, data: saved})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("PUT assignment avec ID:", req.body._id);
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log('Erreur updateAssignment:', err);
            res.status(500).json({error: err.message});
            return;
        }
        if (!assignment) {
            res.status(404).json({error: 'Assignment non trouvé'});
            return;
        }
        console.log("Assignment mis à jour:", assignment.nom);
        res.json({message: 'updated', data: assignment})
    });
}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    console.log("DELETE assignment avec ID:", req.params.id);
    
    Assignment.findByIdAndDelete(req.params.id, (err, assignment) => {
        if (err) {
            console.error('Erreur deleteAssignment:', err);
            res.status(500).json({error: err.message});
            return;
        }
        if (!assignment) {
            console.log('Assignment non trouvé pour l\'ID:', req.params.id);
            res.status(404).json({message: 'Assignment non trouvé'});
            return;
        }
        console.log('Assignment supprimé:', assignment.nom);
        res.json({message: `${assignment.nom} deleted`, data: assignment});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
