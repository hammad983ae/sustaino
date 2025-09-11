import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
  required?: boolean;
  control: Control<any>;
}

interface TextFieldProps extends BaseFieldProps {
  type?: 'text' | 'email' | 'tel' | 'url' | 'number' | 'date' | 'time';
  placeholder?: string;
  step?: string;
  min?: string | number;
  max?: string | number;
}

interface TextareaFieldProps extends BaseFieldProps {
  placeholder?: string;
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  placeholder?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

interface SwitchFieldProps extends BaseFieldProps {}

// Generic Text Input Field
export const FormTextField: React.FC<TextFieldProps> = ({
  name,
  label,
  description,
  className,
  required,
  control,
  type = 'text',
  placeholder,
  step,
  min,
  max,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? `${label} is required` : false },
  });

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className={cn(required && 'after:content-["*"] after:text-destructive after:ml-1')}>
        {label}
      </Label>
      <Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        step={step}
        min={min}
        max={max}
        className={cn(error && 'border-destructive focus-visible:ring-destructive')}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};

// Generic Textarea Field
export const FormTextareaField: React.FC<TextareaFieldProps> = ({
  name,
  label,
  description,
  className,
  required,
  control,
  placeholder,
  rows = 3,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? `${label} is required` : false },
  });

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className={cn(required && 'after:content-["*"] after:text-destructive after:ml-1')}>
        {label}
      </Label>
      <Textarea
        {...field}
        id={name}
        placeholder={placeholder}
        rows={rows}
        className={cn(error && 'border-destructive focus-visible:ring-destructive')}
      />
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};

// Generic Select Field
export const FormSelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  description,
  className,
  required,
  control,
  placeholder,
  options,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: required ? `${label} is required` : false },
  });

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={name} className={cn(required && 'after:content-["*"] after:text-destructive after:ml-1')}>
        {label}
      </Label>
      <Select onValueChange={field.onChange} value={field.value}>
        <SelectTrigger className={cn(error && 'border-destructive focus-visible:ring-destructive')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-sm text-destructive">{error.message}</p>
      )}
    </div>
  );
};

// Generic Switch Field
export const FormSwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  description,
  className,
  control,
}) => {
  const { field } = useController({
    name,
    control,
  });

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Switch
        id={name}
        checked={field.value || false}
        onCheckedChange={field.onChange}
      />
      <div className="space-y-1">
        <Label htmlFor={name}>{label}</Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};