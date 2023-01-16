export interface Category
{
    id?: string;
    title?: string;
    slug?: string;
}

export interface Course
{
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}

export interface ListeReparation
{
    idPiece?: string;
    prix?: string;
    avancement?: string;
    estPaye?:boolean,
    datePaiement?:Date,
    dateDebut?:Date,
    dateFin?:Date
}

export interface ReparationsVoitures
{
    idVoiture?: string,
    listeReparations?: ListeReparation[],
    dateArrivee?: Date,
    dateSortie?: Date,
    etat?: String
}


