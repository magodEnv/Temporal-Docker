drop DATABASE IF EXISTS temporal;
CREATE DATABASE IF NOT EXISTS temporal;
USE temporal;

-- Tabla para las personas (investigadores)
CREATE TABLE personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_ VARCHAR(255) NOT NULL,
    grade VARCHAR(255) NOT NULL,
    institute VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    rol VARCHAR(255),
    core_page TEXT,
    description_ TEXT,
    photo VARCHAR(255)
);

-- Tabla para los proyectos
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    abstract TEXT,
    description_ TEXT,
    start_date DATE,
    end_date DATE,
    state_ VARCHAR(255), -- In Progress, Finished.
    code_project INT,
    core_image VARCHAR(255)
);

-- Tabla para las imagenes de Proyectos
CREATE TABLE imagenes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE
);

-- Tabla relacionará múltiples investigadores con múltiples proyectos. (Para "Projects") --

-- Tabla para los colaboradores
CREATE TABLE investigadores_proyectos (
    proyecto_id INT,
    investigador_id INT,
    PRIMARY KEY (proyecto_id, investigador_id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (investigador_id) REFERENCES personas(id) ON DELETE CASCADE
);

-- Tabla para los Investigadores Principales
CREATE TABLE coreResearchers(
    proyecto_id INT,
    investigador_id INT,
    PRIMARY KEY (proyecto_id, investigador_id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    FOREIGN KEY (investigador_id) REFERENCES personas(id) ON DELETE CASCADE
);

-- Tabla para el Scraping de publicaciones
CREATE TABLE publicaciones (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    authors VARCHAR(255) NOT NULL, -- Variable temporal de autores (autores_publicaciones sin uso)
    year_publi YEAR,
    url TEXT
);


-- Tablas nuevas para la informacion del Landing Page --

-- Tabla para guardar los proyectos que se mostraran en el carrusel
CREATE TABLE mainProyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT UNIQUE,  -- UNIQUE evita que un mismo proyecto se repita en la tabla
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

-- Tabla para guardar la informacion principal del landing (Carrusel: imagen y texto, banner) 
CREATE TABLE landingInfo (
	id INT PRIMARY KEY,
    banner VARCHAR(255),
    estadoBanner BOOL,
    bienvenida VARCHAR(255),
    imagen VARCHAR(255)
);

-- Tabla de X 
CREATE TABLE twitter (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) ,
    token BIGINT 
);
 --                                            Ingresando datos de prueba:
INSERT INTO twitter (nombre, token) VALUES ('NVIDIA app officially launches today featuring', '1856435517648449828');

-- Tabla Personas: 
INSERT INTO personas (name_, grade, institute, correo, rol, core_page, description_, photo)
VALUES 
-- Core Researcher
('Cristobal Navarrro', 
'Doctor', 
'Universidad Austral de Chile', 
'cnavarro@inf.uach.cl', 
'Core Researcher', 
'https://scholar.google.cl/citations?user=RNYDdjEAAAAJ&hl=en', 
'Lorem ipsum dolor sit amet, consectet', 
'CristobalNavarro.jpg'
),
('Hector Ferrada', 
'Doctor', 
'Universidad Austral de Chile', 
'hferrada@uach.cl', 
'Core Researcher', 
'https://scholar.google.com/citations?user=VbE3-M8AAAAJ&hl=en', 
'Mi principal motivación esta en el diseño y análisis de algoritmos genéricos con énfasis en uso de técnicas de HPC. ', 
'HFerrada.jpeg'
),
('Nancy Hitchfeld', 
'Doctor', 
'Universidad Austral de Chile', 
'nancy@dcc.uchile.cl', 
'Core Researcher', 
'https://scholar.google.cl/citations?user=dmafYYgAAAAJ&hl=en',
'I am full professor at the Departamento de Ciencias de la Computación(DCC), Facultad de Ciencias Físicas y Matemáticas(FCFM), Universidad de Chile', 
'NancyH.jpeg'
),
-- Research Assistant
('Felipe Quezada',
'Ingeniero civil informático',
'Universidad Austral de Chile',
'undefined1@temporal.cl',
'Researcher Assistant',
'https://github.com/kezada94', 
'☕ MSc. in Computer Science 💻 Constantly thinking abt AI and HPC 🚀',
'fquezada.jpg'
),
-- Students
('Roberto Carrasco',
'Estudiante',
'Universidad de Chile',
'correo@temporal.cl',
'Student',
'temporal.cl', 
'PhD Student at DCC, Uchile, Chile.',
'rcarrasco.png'
),
('Rodrigo Stevenson',
'Estudiante',
'Universidad Austral de Chile',
'correo@temporal.cl',
'Student',
'temporal.cl', 
'MSc student at MIN, UACh, Chile.',
'rstevenson.png'
),
('Enzo Meneses',
'Estudiante',
'Universidad Austral de Chile',
'correo@temporal.cl',
'Student',
'temporal.cl', 
'MSc student at MIN, UACh, Chile.',
'emeneses.png'
),
('Carlos Schoenfeldt',
'Estudiante',
'Universidad Austral de Chile',
'correo@temporal.cl',
'Student',
'temporal.cl', 
'Undergrduate, UACh, Chile.',
'cschoenfeldt.png'
),
('Francisco Carter',
'Estudiante',
'Universidad de Chile',
'correo@temporal.cl',
'Student',
'temporal.cl', 
'MSc student at DCC',
'fcarter.jpg'
),
-- Collaborator
('Ricardo Barrientos',
'Doctor',
'Catholic University of Maule',
'ricardo.j.barrientos@gmail.com',
'Collaborator',
'https://www.ribarrie.cl/',
'Actualmente cumplo con la Orientación Individual y también Grupal para formar parte de un claustro de
 Doctorado según el Comité de Área de Ciencias de Ingeniería y de la Tierra de la C.N.A.',
'Ricardo_Barrientos.jpg'
),
('Miguel Romero',
'Doctor',
'Adolfo Ibáñez University',
'mgromero@uc.cl',
'Collaborator',
'https://mromero.cl/',
'Im broadly interested in algorithms, complexity and logic. Im also interested in data management and machine learning.',
'mromero.jpg'
),
('Benoit Crespin',
'Doctor',
'University of Limoges',
'mgromero@uc.cl',
'Collaborator',
'temporal.cl',
'Collaborator from temporal',
'bcrespin.png'
),
('Benjamin Bustos',
'Doctor',
'University of Chile',
'bebustos@dcc.uchile.cl',
'Collaborator',
'https://users.dcc.uchile.cl/~bebustos/',
'Collaborator from temporal',
'collab-bbustos.png'
),
('Mario Gonzalez',
'Doctor',
'University of Chile',
'acustica@uach.cl',
'Collaborator',
'https://www.acusticauach.cl/?page_id=572',
'Collaborator from temporal',
'collab-mgonzalez.png'
),
-- Alumni
('Eduardo Hopperdietzel',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2023, Eng] Louvre Library for Composers',
'profile_default.jpeg'
),
('Diego Rojas',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2022, Eng] Open Source Genetic Algorithm',
'profile_default.jpeg'
),
('Roberto Melita',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2020, Eng] CA acceleration in GPU',
'profile_default.jpeg'
),
('Juan Chango',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2020, MSc] GPU Sound Propagation.',
'profile_default.jpeg'
),
('Bruno Silva',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2019, Eng] 3D University APP',
'profile_default.jpeg'
),
('Cesar Vargas',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2018, Eng] Dynamic Path Tracing on GPU',
'profile_default.jpeg'
),
('Gabriel Gonzalez',
'Alumni',
'University of Chile',
'correo@temporal.cl',
'Alumni',
'Temporal.cl',
'[2018, Eng] GPU Thread Mapping on Tetrahedrons',
'profile_default.jpeg'
)
;

-- Tabla Proyectos:
INSERT INTO proyectos (title, subtitle, abstract, description_, start_date, end_date, state_, code_project, core_image)
VALUES 
('Fondecyt Regular 1221357', 
'Combining Tensor Cores with Ray-Tracing Cores for GPU-based Simulations', 
'The main objective of this proposal is to develop new approaches that can improve the performance and energy-efficiency of GPU-based scientific simulations, by combining tensor-core with RT-core operations.', 
'The main objective of this proposal is to develop new approaches that can improve the performance and energy-efficiency of GPU-based scientific simulations, by combining tensor-core with RT-core operations. The hypothesis is that a significant part of the work involved in GPU-based scientific simulations can be mapped as fast MMA (tensor-core) and space-search operations in a BVH data structure (RT-core), improving their performance and energy-efficiency. Furthermore, the combination of these cores can produce new energy-efficient computational patterns. The specific objectives consist of redesigning frequently used GPU computational patterns such as nearest-neighbors exploration in structured-space, nearest-neighbors search in unstructured- space, sorting/min/max, elementary graph operations and to compose a new computational pattern for semi- structured space. The methodology is based on representing local/short-range computations as structured- space tensor-core MMA operations, codifying work into the row-column computations, and global/long-range computations as unstructured-space RT-core ray-triangle intersections. In addition to the computational patterns already mentioned in the specific objectives, the combination of these two approaches would allow the formulation of a new computational pattern for semi-structured-space simulations. The expected results are a major improvement in performance and energy-efficiency for the computational patterns, allowing the study of larger simulations as well as enable real-time performance for some of them. Numerical precision will be studied as well, finding how much does the problem size, data types and data distributions affect the result. The importance of this research is that the improvements produced on each computational pattern affects not only one specific scientific simulation, but families of simulations from the different fields of science.', 
'2024-01-01', 
'2024-12-31', 
'Finished',
1221357,
'fondecyt1221357.png' 
),
('Patagón', 
'Patagón: GPU-based Supercomputer', 
'Su principal función es acelerar la investigación y generación de nuevo conocimiento en la UACh y otras instituciones, permitiendo el estudio de fenómenos de gran complejidad y magnitud', 
'La principal característica del Patagón es que el procesamiento es acelerado por GPUs. Los problemas computacionales que se adaptan mejor al procesamiento por GPU son los que son altamente paralelizables, es decir, que el problema puede ser subdividido en múltiples partes. La solución simultanea de las partes provoca una disminución del tiempo de computo, y por lo tanto, una aceleración en la velocidad de procesamiento.', 
'2021-02-01', 
'2024-11-30',
'Finished',
666,
'patagon.png' 
),
('Fondecyt 11180881', 
'Exploiting GPU Tensor Cores for Non-Machine Learning Applications', 
'The latest advancements in the field of Machine Learning (ML) have not only changed the way many computing problems are solved, but have also influenced the design of computer processors towards the inclusion of application-specific integrated circuits (ASICs) to further accelerate the computations of matrix operations in ML.', 
'The latest advancements in the field of Machine Learning (ML) have not only changed the way many computing problems are solved, but have also influenced the design of computer processors towards the inclusion of application-specific integrated circuits (ASICs) to further accelerate the computations of matrix operations in ML. In the case of Nvidia GPUs, their latest Volta architecture includes a new class of processing units named “Tensor Cores”, which sit in the GPU chip next to the traditional FP32 and FP64 CUDA cores. These tensor cores take parallel machine learning computation one step further, providing up to an order of magnitude of greater performance over the already fast performance of the CUDA cores, making them an accelerator within an accelerator. However, the extra performance offered by the tensor cores does not come without costs; part of the tensor core computation must operate at 16-bit (FP16) and their utilization is not automatic by the GPU, i.e., they have to be manually programmed in a way that is different from the standard CUDA programming model for CUDA cores. The applications that naturally take advantage of tensor core performance are the ones defined by ML theory or linear algebra, more specifically training and inference in deep neural networks and large matrix-multiply operations, which is the purpose why these cores were originally built for. The scenario recently described leads to the formulation of the following two research questions: How can tensor cores be exploited and how much can they further accelerate GPU-based applications that are not naturally defined by ML theory or linear algebra?, Is the tensor core numerical precision still precise enough to guarantee the correctness of the new accelerated applications?. Finding positive answers to these questions would have a great impact in the fields of science and engineering where many problems still require faster solutions.', 
'2024-02-01', 
'2024-11-30',
'Finished', 
11180881,
'fondecyt11180881.png' 
),
('Fondecyt 3160182', 
'Efficient GPU Computing in Complex Particle-based Domains', 
'GPU computing has become an important tool for speeding up computational problems that exhibit data-parallelism. Particle-based problems in particular present a large amount of data-parallelism and they are common in many areas of science and technology such as particle simulation, PDEs, cellular automata, molecular dynamics, computing 3D descriptors for shape matching and graph-based problems among others.', 
'GPU computing has become an important tool for speeding up computational problems that exhibit data-parallelism. Particle-based problems in particular present a large amount of data-parallelism and they are common in many areas of science and technology such as particle simulation, PDEs, cellular automata, molecular dynamics, computing 3D descriptors for shape matching and graph-based problems among others. Solving particle-based problems has proven to be more efficient and convenient with GPU computing, being up to an order of magnitude faster than a CPU-based method. The massive parallelism model, which is an abstrac- tion layer for designing parallel GPU-based algorithms, has been a critical tool for making these algorithms run efficiently and scale properly in the GPU. Its main component is the space of computation, also known as the grid or workspace, which plays an important role for organizing the threads in space and eventually map them to the problem space. In the present, the masive parallelism model works efficiently in box-shaped domains, requiring no special trick for mapping the threads to the problem domain. However, for more complex types of particle-based domains, such as non-square ones, the abstraction presents several inefficiencies at the level of GPU architecture. These inefficiencies can lead to slow performance and disappointing scalability since the parallel processor is not used in the best way. There is a great demand on working with complex domains such as non-rectangular geometries and even fractal ones. To the present day, these types of data-parallel problems present a interesting challenge for GPU computing. This project focuses on researching new techniques for the GPU architecture that can improve the perfor- mance in static and dynamic problems with complex particle-based domains. For the static case, it addresses the problem of achieving the minimum space of computation in complex Euclidean and fractal domains, by proposing mapping functions that preserve locality. The methodology to formulate these maps will be based on the enumeration principle, which is a technique that can provide O(1) cost maps by solving a k -order poly- nomial. For the dynamic case, we address the problem of handling a parallel data structure efficiently in the massive parallelism model. The methodology for the dynamic part is to propose a solution based on a forest of space partitioning trees, instead of one as in the literature, and connect them with an efficient graph such as a Delaunay triangulation. The hypothesis is that it is possible to achieve fast spaces of computation with near- optimal sizes for static domains through map functions. For the dynamic case a forest of trees will increase the data-parallelism leveraging the performance of the GPU. The performance of both solutions will scale as more GPUs are available. The results of this project will have a strong computational impact and applicability, since it is not tied to a single problem, but to a family of problems that share the same properties. Furthermore, these results will eventually help other fields where this type of problems indeed exist, such as computational physics, cellular automata, 3D shape matching and molecular dynamics among others', 
'2021-02-01', 
'2024-11-30',
'Finished',
3160182,
'fondecyt3160182.png' 
);



INSERT INTO imagenes (proyecto_id, url) VALUES
(1, 'fondecyt1221357.png'), -- Fondecyt regular 1221357
(2, 'patagon.png'),-- Patagon
(2, 'Ey8WAoaWUAA1oF9.jpg'), -- Patagon
(3, 'fondecyt11180881.png'),-- Fondecyt 11180881
(4, 'fondecyt3160182.png')-- Fondecyt 3160182
;


-- Tabla de los Investigadores en los Proyectos:
INSERT INTO coreResearchers (proyecto_id, investigador_id)
VALUES 
(1, 1),  -- Cristobal Navarro está en el Proyecto 1
(2, 1), -- Cristobal Navarro está en el Proyecto 2
(3, 1), -- Cristobal Navarro está en el Proyecto 3
(4, 1); -- Cristobal Navarro está en el Proyecto 4


INSERT INTO landingInfo (id, banner, estadoBanner, bienvenida, imagen)
VALUES (
1, 
'Thank you for visiting our page.', 
true, 
'We are the Temporal research group from Chile. We research on High Performance Computing (HPC).',
'/verde_inicio.jpg');



