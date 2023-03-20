﻿using Abp.Web.Models;
using Castle.MicroKernel.Registration;
using System;
using System.ComponentModel.DataAnnotations;

namespace SoftGrid.Dto
{
    public class FileDto
    {
        [Required]
        public string FileName { get; set; }

        public string FileType { get; set; }

        [Required]
        public string FileToken { get; set; }

        public FileDto()
        {
            
        }

        public FileDto(string fileName, string fileType)
        {
            FileName = fileName;
            FileType = fileType;
            FileToken = Guid.NewGuid().ToString("N");
        }
    }

    public class UploadedFileOutput : ErrorInfo
    {
        public string FileToken { get; set; }

        public UploadedFileOutput()
        {

        }

        public UploadedFileOutput(ErrorInfo error)
        {
            Code = error.Code;
            Details = error.Details;
            Message = error.Message;
            ValidationErrors = error.ValidationErrors;
        }
    }

    public class FileInputDto
    {
        public string FileToken { get; set; }
    }
}