"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function FilterSidebar({ filterOptions, activeFilters, onFilterChange, onClearFilters }) {
  const { subjects, semesters, fileTypes, professors } = filterOptions

  const countActiveFilters = () => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0)
  }

  const renderFilterSection = (title, options, filterType) => {
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3">{title}</h3>
        <div className="space-y-2">
          {options.map((option) => (
            <div key={`${filterType}-${option}`} className="flex items-center">
              <Checkbox
                id={`${filterType}-${option}`}
                checked={activeFilters[filterType].includes(option)}
                onCheckedChange={() => onFilterChange(filterType, option)}
              />
              <label
                htmlFor={`${filterType}-${option}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  return (
    <div className="w-full md:w-64 bg-white p-5 rounded-lg border border-gray-200 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">Filters</h2>
        {countActiveFilters() > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-8 px-2 text-xs">
            Clear All
            <X className="ml-1 h-3 w-3" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {renderFilterSection("Subject", subjects, "subject")}
      {renderFilterSection("Semester", semesters, "semester")}
      {renderFilterSection("File Type", fileTypes, "fileType")}
      {renderFilterSection("Professor", professors, "professor")}
    </div>
  )
}

