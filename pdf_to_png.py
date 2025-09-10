#!/usr/bin/env python3
import os
from pdf2image import convert_from_path

def convert_pdf_to_png(pdf_path, output_dir):
    """
    Convert each page of a PDF to a PNG image and save to the output directory.
    
    Args:
        pdf_path (str): Path to the PDF file
        output_dir (str): Directory to save the PNG images
    """
    print(f"Converting {pdf_path} to PNG images...")
    
    # Make sure output directory exists
    os.makedirs(output_dir, exist_ok=True)
    
    # Get the base name of the PDF (without extension)
    base_name = os.path.basename(pdf_path).rsplit('.', 1)[0]
    
    try:
        # Convert PDF to list of images
        pages = convert_from_path(pdf_path, 300)  # 300 DPI for good quality
        
        print(f"Found {len(pages)} pages in the PDF")
        
        # Save each page as a PNG file
        for i, page in enumerate(pages):
            output_path = os.path.join(output_dir, f"slide{i+1}.png")
            page.save(output_path, "PNG")
            print(f"Saved page {i+1}/{len(pages)} to {output_path}")
            
        print("Conversion completed successfully!")
        return True
    except Exception as e:
        print(f"Error converting PDF to PNG: {e}")
        return False

def process_directory(input_dir, output_dir):
    """
    Process all PDF files in the input directory and convert them to PNG in the output directory.
    
    Args:
        input_dir (str): Directory containing PDF files
        output_dir (str): Directory to save the PNG images
    """
    print(f"\nProcessing directory: {input_dir} -> {output_dir}")
    
    # Find all PDF files in the input directory
    pdf_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print(f"No PDF files found in {input_dir}")
        return False
    
    # Convert each PDF
    for pdf_file in pdf_files:
        pdf_path = os.path.join(input_dir, pdf_file)
        convert_pdf_to_png(pdf_path, output_dir)
        
    return True

if __name__ == "__main__":
    # Get the current directory where this script is running
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Process left slides
    leftin_dir = os.path.join(current_dir, "leftin")
    left_output_dir = os.path.join(current_dir, "left")
    process_directory(leftin_dir, left_output_dir)
    
    # Process right slides
    rightin_dir = os.path.join(current_dir, "rightin")
    right_output_dir = os.path.join(current_dir, "right")
    process_directory(rightin_dir, right_output_dir)
