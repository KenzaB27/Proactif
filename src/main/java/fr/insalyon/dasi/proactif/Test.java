/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fr.insalyon.dasi.proactif;

import fr.insalyon.dasi.proactif.dao.JpaUtil;
import fr.insalyon.dasi.proactif.metier.modele.Animal;
import fr.insalyon.dasi.proactif.metier.modele.Client;
import fr.insalyon.dasi.proactif.metier.modele.Employe;
import fr.insalyon.dasi.proactif.metier.modele.Incident;
import fr.insalyon.dasi.proactif.metier.modele.Livraison;
import fr.insalyon.dasi.proactif.metier.modele.Personne;
import fr.insalyon.dasi.proactif.metier.service.Service;
import fr.insalyon.dasi.proactif.util.Saisie;
import java.text.ParseException;

/**
 *
 * @author dhamidovic
 */
public class Test {

    public static Client clientCourant;
    public static Employe employeConnecte;

    public static void main(String args[]) throws ParseException {

        JpaUtil.init();
        Service.Initialisation();

        Client c = new Client("M", "Dupont", "Grégoire", "1998-06-02", "7 Avenue Jean Capelle Ouest, Villeurbanne", "0658974316", "test@gmail.com", "123");
        Service.inscrireClient(c);
        //Service.envoyerCodeConfirmation("test@gmail.com","0658974316" );
        //
        Personne p = Service.connexion("test@gmail.com", "123");
        if (p instanceof Client) {
            System.out.println((Client) p);
        }
        Incident i = new Incident("mon voisin m'a signalé un incident");
        Animal a = new Animal("pug", "Il faudrait sortir Bruno au park en face de chez moi");
        Livraison l = new Livraison("colis", "DPD", "blablabla");
        Incident i2 = new Incident("blabla2");
        System.out.println(Service.demandeIntervention(c, i));
        System.out.println(Service.demandeIntervention(c, a));
        System.out.println(Service.demandeIntervention(c, l));

        Service.cloturerIntervention(i, "Tout bon", true);

        Service.cloturerIntervention(a, "Tout bon", true);

        Service.cloturerIntervention(l, "Tout bon", false);

        System.out.println(Service.demandeIntervention(c, i2));
        Service.cloturerIntervention(i2, "Tout bon", true);

        Client e = (Client) Service.connexion("test@gmail.com", "123");

        System.out.println(e);
        Service.HistoriqueClientParTypeEtDate("livraison", "26/03/2019", e);
        Service.RecupererInterventionsDuJour((Employe) Service.connexion("emp9@gmail.com", "258"));
        JpaUtil.destroy();

    }

/*    public void menu() {
        int sousmenu = 0;
        boolean arret = false;
        while (!arret) {

            System.out.println("--Bienvenue sur Proactif--");
            System.out.println("Pour vous connecter : tapez 1");
            System.out.println("Pour vous inscrire  : tapez 2");
            System.out.println("Pour quitter : tapez 0");
            sousmenu = Saisie.lireInteger("Inqiquer votre choix: ");
            switch (sousmenu) {
                case 1: {
                    int choix = 0;
                    System.out.println("---Portail de connexion---");
                    System.out.println("Pour revenir sur le menu précédent : tapez -1 ");
                    System.out.println("Pour quitter : tapez 9");
                    System.out.println("Pour continuer : tapez 1");

                    choix = Saisie.lireInteger("Inqiquer votre choix: ");
                    switch (choix) {
                        case 1:
                            String mail = "";
                            String mdp;
                            Personne p;
                            int i = 0;
                            do {
                                if (i > 0) {
                                    System.out.println("Votre identifiant ou mot de passe est incorrect");
                                }
                                if (i < 2) {
                                    System.out.println("Merci de remplir les champs suivants");
                                    mail = Saisie.lireChaine("Adresse mail: ");
                                    mdp = Saisie.lireChaine("Mot de passe: ");
                                    p = Service.connexion(mail, mdp);
                                    i++;
                                }
                                if (i >= 2) {
                                    System.out.println("Vous avez oublie votre mot de passe? : tapez 1");
                                    
                                    String num = Saisie.lireChaine("Saisir votre numero de telephone pour recevoir un code de confirmation: ");
                                    int code1 = Service.envoyerCodeConfirmation(mail, num);

                                    int code2 = Saisie.lireInteger("Saisir votre code de confirmation: ");
                                    if (code1 == code2) {
                                        String mdp1 = Saisie.lireChaine("Saisir votre nouveau mot de passe: ");
                                        Client c = Service.findClient(mail, num);
                                        Service.updateMdp(c, mdp1);
                                        System.out.println("Merci de remplir les champs suivants pour vous connecter");
                                        mail = Saisie.lireChaine("Adresse mail: ");
                                        mdp = Saisie.lireChaine("Mot de passe: ");
                                        p = Service.connexion(mail, mdp);

                                    }
                                }

                            } while (p == null && i >= 4);

                            if (p instanceof Client) {
                                clientCourant = (Client) p;
                            } else if (p instanceof Employe) {
                                employeConnecte = (Employe) e;
                            }

                            break;
                        case 2:
                            System.out.println("Sous menu 1-2");
                            break;
                        case 9:
                            arret = true;
                            break;
                        default:
                            System.out.println("entrez un choix entre 1 et 2");
                            break;
                    }
                }
                break;
                case 2:
                    String civilite = civilite;
                    String nom = nom;
                    String prenom = prenom;
                    String dateNaissance = dateNaissance;
                    String adresse = adresse;
                    String coord = coord;
                    String numTel = numTel;
                    String adresseElec = adresseElec;
                    String mdp = mdp;
                    System.out.println("Sous menu 2");
                    break;
                case 3:
                    System.out.println("Sous menu 2");
                    break;
                case 9:
                    arret = true;
                    break;
                default:
                    System.out.println("entrez un choix entre 1 et 3");
                    break;
            }
        }
    }


*/
}
