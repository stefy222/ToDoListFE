import {useState} from "react";
import CategoryList from "../components/CategoryList";
import CategoryForm from "../components/CategoryForm";
import CategoryDetail from "../components/CategoryDetail";

function CategoryPage(){
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [categoryToView, setCategoryToView] = useState(null);
    const [reload, setReload] = useState(false);
    
    const handleEdit = (category) => {
    setCategoryToEdit(category);
    setCategoryToView(null);
    };

    const handleView = (id) => {
    setCategoryToView(id);
    setCategoryToEdit(null);
    };

    const handleSaved = () => {
    setCategoryToEdit(null);
    setReload(!reload);
    };

    const handleBack = () => {
    setCategoryToView(null);
    };

    return (
        <div className="app-container">
            <h1>Categorías</h1>

            {categoryToView ? (
                <CategoryDetail
                    categoryId={categoryToView}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <CategoryForm
                        categoryToEdit={categoryToEdit}
                        onSaved={handleSaved}
                    />

                    <CategoryList
                        key={`category-${reload}`}
                        onEdit={handleEdit}
                        onView={handleView}
                    />
                </>
            )}
        </div>
    );
}

export default CategoryPage;