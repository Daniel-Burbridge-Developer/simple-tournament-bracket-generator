import { useFieldContext } from "~/hooks/form-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FieldErrors } from "./field-errors";
import { Trash2, Plus } from "lucide-react";

export interface ArrayFieldProps {
  label: string;
  itemLabel?: string;
  placeholder?: string;
  minItems?: number;
  maxItems?: number;
}

interface ParticipantItem {
  name: string;
  imageUrl: string;
}

export function ArrayField({ 
  label, 
  itemLabel = "Item", 
  minItems = 0,
  maxItems = 20
}: ArrayFieldProps) {
  const field = useFieldContext<ParticipantItem[]>();
  
  const handleAddItem = () => {
    if (field.state.value.length < maxItems) {
      field.pushValue({ name: '', imageUrl: '' });
    }
  };
  
  const handleRemoveItem = (index: number) => {
    if (field.state.value.length > minItems) {
      field.removeValue(index);
    }
  };

  const handleNameChange = (index: number, value: string) => {
    field.setValue((prev) => {
      const newValue = [...prev];
      newValue[index] = { ...newValue[index], name: value };
      return newValue;
    });
  };

  const handleImageUrlChange = (index: number, value: string) => {
    field.setValue((prev) => {
      const newValue = [...prev];
      newValue[index] = { ...newValue[index], imageUrl: value };
      return newValue;
    });
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={field.name}>{label}</Label>
      
      <div className="space-y-4">
        {field.state.value.map((item, index) => (
          <div key={index} className="flex items-start gap-2 p-4 border rounded-lg">
            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <Label htmlFor={`${field.name}[${index}].name`}>{itemLabel} {index + 1} Name</Label>
                <Input
                  id={`${field.name}[${index}].name`}
                  value={item.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder={`${itemLabel} ${index + 1} name`}
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor={`${field.name}[${index}].imageUrl`}>Image URL (Optional)</Label>
                <Input
                  id={`${field.name}[${index}].imageUrl`}
                  value={item.imageUrl}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  onBlur={() => field.handleBlur()}
                  placeholder="https://example.com/image.jpg"
                  type="url"
                />
              </div>
              
              {item.imageUrl && (
                <div className="space-y-1">
                  <Label>Preview</Label>
                  <div className="w-16 h-16 border rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={item.imageUrl} 
                      alt={`${item.name} preview`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '';
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleRemoveItem(index)}
              disabled={field.state.value.length <= minItems}
              className="px-2 mt-6"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleAddItem}
        disabled={field.state.value.length >= maxItems}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {itemLabel}
      </Button>
      
      <FieldErrors meta={field.state.meta} />
    </div>
  );
} 