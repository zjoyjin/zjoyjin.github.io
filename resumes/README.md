# Resume Folder

This folder contains your downloadable resumes.

## How to Add Your Resumes

1. **Add your PDF files to this folder** with these exact names:
   - `research-resume.pdf` - Your research/academic resume
   - `engineer-resume.pdf` - Your engineering/software development resume

2. **File requirements:**
   - Format: PDF only
   - File size: Under 5MB recommended
   - File names: Must match exactly (lowercase, with hyphens)

3. **Current setup:**
   - Files are linked from the Contact page
   - Clicking the buttons will open the PDF in a new tab
   - The `download` attribute allows users to download directly

## File Names (Must Match Exactly)

```
resumes/
├── research-resume.pdf    ← Your research resume goes here
├── engineer-resume.pdf    ← Your engineering resume goes here
└── README.md             ← This file
```

## Testing

After adding your PDFs:
1. Go to your Contact page
2. Click each resume button
3. Verify the PDF opens correctly
4. Test on both desktop and mobile

## Updating Resumes

To update your resume:
1. Simply replace the existing PDF file with the new version
2. Keep the same filename
3. Commit and push to GitHub

The links on your website will automatically point to the updated files.

## Troubleshooting

**Resume link shows 404 error:**
- Check that the filename matches exactly: `research-resume.pdf` or `engineer-resume.pdf`
- Make sure the file is in the `/resumes/` folder
- Verify you've pushed the files to GitHub

**PDF won't download:**
- Ensure the file is a valid PDF
- Check file size (GitHub has limits for large files)
- Try opening in different browsers
