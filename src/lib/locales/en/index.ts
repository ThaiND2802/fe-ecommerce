const en = {
  translation: {
    setting: {
      dateFormat: 'MM/DD/YYYY',
      dateTimeFormat: 'MM/DD/YYYY HH:mm',
    },
    button: {
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
      close: 'Close',
      import: 'Import',
      export: 'Export',
      filter: 'Filter',
      columns: 'Columns',
    },
    common: {
      button: {
        save: 'Save',
        close: 'Close',
        cancel: 'Cancel',
        confirm: 'Confirm',
        add: 'Add',
        delete: 'Delete',
        edit: 'Edit',
        agree: 'Agree',
      },
      message: {
        apiFailed: 'An error occurred! Please try again',
        sendSuccess: 'Sent successfully',
        sendFail: 'Send failed. Please try again',
        createSuccess: 'Created successfully',
        createFail: 'Creation failed. Please try again',
        updateSuccess: 'Updated successfully',
        updateFail: 'Update failed. Please try again',
        deleteSuccess: 'Deleted successfully',
        deleteFail: 'Deletion failed. Please try again',
        downloading: 'Getting file...',
        saveSuccess: 'Saved successfully',
        saveFail: 'Save failed. Please try again',
        noAccess: 'You do not have permission to access this content',
      },
      text: {
        yes: 'Yes',
        no: 'No',
        edit: 'Edit',
        delete: 'Delete',
        noData: 'No data',
      },
      validation: {
        required: 'This field is required',
        fileUploading: 'File is uploading',
        fileUploadError: 'File upload failed',
      },
    },

    Table: {
      button: {
        clear: 'Clear Filters',
        showColumn: 'Show Column',
        groupData: 'Group Data',
      },
      placeholder: {
        search: 'Search',
      },
      pagination: {
        showTotal: 'Showing {{from}} to {{to}} of {{total}} records',
      },
    },

    Confirmation: {
      undoneWarning: 'This action cannot be undone',
      deleteQuestion: 'Are you sure you want to delete "{{entry}}"?',
    },

    FileUploader: {
      errors: {
        fileInvalid: 'Invalid file type',
        fileSizeExceeded: 'File size exceeds the limit',
        fileUploadFailed: 'File upload failed',
      },
    },

    FileDrop: {
      dragAndDropOr: 'Drag and drop files here or',
      browse: 'Browse',
      format: 'File type {{format}}',
      size: 'Maximum file size {{size}}',
    },

    SelectSearch: {
      addNew: 'Add new',
    },

    Modal: {
      ok: 'Save',
      cancel: 'Cancel',
    },

    Attachments: {
      downloadAll: 'Download all',
      validation: {
        fileUploading: 'File is uploading',
        fileUploadError: 'File upload failed',
      },
    },

    InlineMemberSelector: {
      placeholder: 'Select member',
      searchPlaceholder: 'Search member',
    },

    Comment: {
      button: {
        send: 'Send',
        attachFile: 'Attach file',
        close: 'Close',
      },
      placeholder: {
        comment: 'Add a comment',
      },
    },

    StackMemberSelect: {
      members_one: '{{count}} member',
      members_other: '{{count}} members',
    },

    UserGroupSelector: {
      title: 'User and group',
      placeholder: {
        company: 'Select Company',
        user: 'Select User',
        search: 'Search',
        searchSelectedMember: 'Name, job title, email',
      },
      button: {
        add: 'Add',
      },
      label: {
        userList: 'User list',
      },
      text: {
        selectTooltip: 'Modify members in group',
        members_one: '{{count}} member',
        members_other: '{{count}} members',
        expired_one: 'there is {{count}} expired license member',
        expired_other: 'there are {{count}} expired license members',
      },
      memberListPopup: {
        title: 'Users',
        placeholder: {
          search: 'Name, job title, email',
        },
      },
    },

    TableColumnSelect: {
      title: 'Columns',
      searchPlaceholder: 'Search field',
      show: 'Visible',
      hideAll: 'Hide all',
      hidden: 'Hidden',
    },

    RequestFlow: {
      delegation: 'Delegated to {{name}}',
      recievedDate: 'Recieved date: {{date}}',
      processedDate: 'Processed date: {{date}}',
    },

    Copy: {
      copied: 'Copied',
    },

    PrintModal: {
      print: 'Print',
    },

    Oops: {
      error: 'An error occurred! Please try again',
      reloadPage: 'Reload page',
      noAccess: 'You do not have permission to access this content',
      disconnected: 'You are disconnected from the server. Please try again later.',
    },

    ContactPopover: {
      info: 'Info',
    },

    FilterPopover: {
      title: 'Filter',
      button: {
        clear: 'Clear',
        apply: 'Apply',
      },
      label: {
        list: 'List',
        other: 'Other',
      },
    },

    SearchPopover: {
      placeholder: {
        search: 'Search',
      },
    },

    Import: {
      title: 'Import',
      button: {
        cancel: 'Cancel',
        import: 'Import',
        back: 'Back',
        continue: 'Continue',
      },
      step: {
        selectFile: 'Upload source file',
        configuration: 'Import configuration',
        fieldMapping: 'Data mapping',
        import: 'Review data',
      },
      selectFile: {
        templateDescription: 'To ensure accurate import results, please use the template file',
        templateDownload: 'Download template file',
        label: {
          sourceFile: 'Upload source file',
          sheetName: 'Import sheet',
          headerRow: 'Header row',
        },
        placeholder: {
          sheetName: 'Select sheet',
        },
      },
      configuration: {
        insertOptions: {
          insertAndUpdate: 'Insert and update',
          update: 'Update',
          insert: 'Insert',
        },
        label: {
          importType: 'Data column in source file',
          emptyData: 'Do not update empty data into fields with value',
          defaultLanguage:
            'If no additional language is entered, the system will automatically fill in the default language data and display',
        },
      },
      fieldMapping: {
        description: 'Select data columns on the source file to connect data on the system',
        label: {
          systemField: 'Data column on the system',
          importedField: 'Data column on the source file',
        },
      },
      import: {
        description: 'Please review the data before importing',
        label: {
          list: 'List',
          total: 'Total',
          valid: 'Valid',
          invalid: 'Invalid',
        },
        message: {
          validating: 'Please wait until the validation process is complete',
          success: 'The list has been imported successfully into the system',
          error: 'Import failed, please try again',
        },
      },
      export: {
        download: 'Download',
        all: 'All data',
        errorsOnly: 'Errors only',
      },
    },
    PlateEditor: {
      link: {
        insert: 'Insert link',
        edit: 'Edit link',
        example: 'https://example.com',
        urlLabel: 'URL',
        urlRequired: 'Please enter a URL',
        urlPlaceholder: 'https://example.com',
        ok: 'OK',
        cancel: 'Cancel',
        invalidUrl: 'Invalid URL',
      },
      image: {
        uploadError: 'Only image files can be uploaded',
        sizeError: 'File size must not exceed 10MB',
      },
      table: {
        backgroundColor: 'Background color',
        selectSize: 'Select table size',
        selectTable: 'Select table {{rows}} x {{cols}}',
        mergeCells: 'Merge cells',
        splitCell: 'Split cell',
        insertRowBefore: 'Insert row before',
        insertRowAfter: 'Insert row after',
        deleteRow: 'Delete row',
        insertColumnBefore: 'Insert column before',
        insertColumnAfter: 'Insert column after',
        deleteColumn: 'Delete column',
        deleteTable: 'Delete table',
        cellBorders: 'Cell borders',
        borders: {
          top: 'Top Border',
          right: 'Right Border',
          bottom: 'Bottom Border',
          left: 'Left Border',
          none: 'No Border',
          outside: 'Outside Borders',
        },
      },
      heading: {
        placeholder: 'Heading',
        paragraph: 'Paragraph',
        heading1: 'Heading 1',
        heading2: 'Heading 2',
        heading3: 'Heading 3',
        heading4: 'Heading 4',
        heading5: 'Heading 5',
        heading6: 'Heading 6',
      },
      list: {
        placeholder: 'List',
        none: 'None',
        bullet: 'Bullet List',
        number: 'Number List',
      },
    },
  },
}

export default en
