import React from 'react';
import Table from '../ui/Table';
import Button from '../ui/Button';
import { format } from 'date-fns';

/**
 * Document Table Component
 * Displays search results in table format (desktop)
 */
const DocumentTable = ({ documents, onPreview, onDownload }) => {
  const columns = [
    {
      header: 'Date',
      accessor: 'document_date',
      width: '12%',
      render: (row) => format(new Date(row.document_date), 'dd/MM/yyyy'),
    },
    {
      header: 'Category',
      accessor: 'major_head',
      width: '15%',
    },
    {
      header: 'Sub-Category',
      accessor: 'minor_head',
      width: '18%',
    },
    {
      header: 'Tags',
      accessor: 'tags',
      width: '25%',
      render: (row) => {
        // Handle both array and comma-separated string formats
        const tags = Array.isArray(row.tags) 
          ? row.tags 
          : (row.tags?.split(',') || []);
        return (
          <div className="d-flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-primary">
                {typeof tag === 'string' ? tag.trim() : tag}
              </span>
            ))}
          </div>
        );
      },
    },
    {
      header: 'File',
      accessor: 'file_name',
      width: '15%',
      render: (row) => (
        <small className="text-muted">{row.file_name || row.document_name}</small>
      ),
    },
    {
      header: 'Actions',
      width: '15%',
      render: (row) => (
        <div className="d-flex gap-1">
          <Button
            variant="info"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(row);
            }}
          >
            Preview
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDownload(row);
            }}
          >
            Download
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={documents} />;
};

export default DocumentTable;
