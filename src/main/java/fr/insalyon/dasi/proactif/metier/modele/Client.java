/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.insalyon.dasi.proactif.metier.modele;

import com.google.maps.model.LatLng;
import java.io.Serializable;
import java.text.ParseException;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

/**
 *
 * @author dhamidovic
 */
@Entity

public class Client extends Personne implements Serializable {

    @OneToMany(mappedBy="client")
    private List<Intervention> histoInterventions;

    @Override
    public String toString() {
        return super.toString()+"Client{" + '}';
    }

    public List<Intervention> getHistoInterventions() {
        return histoInterventions;
    }

    public void setHistoInterventions(List<Intervention> histoInterventions) {
        this.histoInterventions = histoInterventions;
    }

    public Client() {
        super(); 
    }

    public Client(String civilite, String nom, String prenom, String dateNaissance,
            String adresse, String numTel, String adresseElec, String mdp) throws ParseException {
        super(civilite, nom, prenom, dateNaissance, adresse, numTel, adresseElec, mdp);
    }

    public boolean addHistoInterventions(Intervention i) {
        return this.histoInterventions.add(i);
    }

}
