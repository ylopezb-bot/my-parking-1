// --- Funciones de utilidad ---
        function formatDateTime(date) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses son 0-11
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return {
                date: `${day}/${month}/${year}`,
                time: `${hours}:${minutes}:${seconds}`,
                full: `${day}/${month}/${year}    ${hours}:${minutes}:${seconds}`
            };
        }

        function updateDateTime() {
            const now = new Date();
            const formatted = formatDateTime(now);
            currentDateTimeSpan.textContent = formatted.full;
            horaEntradaInput.value = formatted.time; // Actualiza también el campo de hora de entrada
        }

        function updateValorPorHora() {
            const tipo = tipoVehiculoSelect.value;
            valorHoraInput.value = `$${PRECIOS_POR_HORA[tipo]} / Hora`;
        }

        function generateFacturaNumber() {
            const now = new Date();
            const year = String(now.getFullYear()).slice(-2);
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `FAC-${year}${month}${day}-${String(facturaCounter++).padStart(4, '0')}`;
        }

        function limpiarCampos() {
            numeroPlacaInput.value = '';
            tipoVehiculoSelect.value = 'carro'; // Resetear a carro por defecto
            updateValorPorHora(); // Actualizar el valor por hora al limpiar
            numFacturaInput.value = ''; // Limpiar el campo de factura
            // La hora de entrada se actualiza automáticamente
            numeroPlacaInput.focus(); // Poner el foco en el campo de placa
        }

        function renderVehiculos() {
            dataArea.innerHTML = ''; // Limpiar el área antes de renderizar
            vehiculosEnParqueo.forEach(vehiculo => {
                const vehicleEntryDiv = document.createElement('div');
                vehicleEntryDiv.classList.add('vehicle-entry');
                vehicleEntryDiv.setAttribute('data-placa', vehiculo.placa); // Para identificar fácilmente

                vehicleEntryDiv.innerHTML = `
                    <div>${vehiculo.numFactura}</div>
                    <div>${vehiculo.placa}</div>
                    <div>${vehiculo.tipoVehiculo.toUpperCase()}</div>
                    <div>${vehiculo.horaIngreso}</div>
                    <div>$${vehiculo.valorHora}</div>
                    <div id="salida-${vehiculo.placa}">${vehiculo.horaSalida || 'PENDIENTE'}</div>
                    <div class="total-value" id="total-${vehiculo.placa}">${vehiculo.valorTotal || 'N/A'}</div>
                `;
                dataArea.appendChild(vehicleEntryDiv);
            });
        }

        // --- Event Handlers ---
        btnIngreso.addEventListener('click', () => {
            const placa = numeroPlacaInput.value.trim().toUpperCase();
            const tipo = tipoVehiculoSelect.value;
            const horaIngreso = horaEntradaInput.value;
            const valorPorHora = PRECIOS_POR_HORA[tipo];

            if (!placa) {
                alert('Por favor, ingrese el número de placa.');
                return;
            }

            // Verificar si el vehículo ya está en el parqueo
            if (vehiculosEnParqueo.some(v => v.placa === placa && !v.horaSalida)) {
                alert(`El vehículo con placa ${placa} ya se encuentra en el parqueo.`);
                return;
            }

            const newFactura = generateFacturaNumber();
            numFacturaInput.value = newFactura; // Mostrar el número de factura generado

            const nuevoVehiculo = {
                numFactura: newFactura,
                placa: placa,
                tipoVehiculo: tipo,
                horaIngreso: horaIngreso,
                timestampIngreso: new Date(), // Guardar timestamp para cálculos
                valorHora: valorPorHora,
                horaSalida: null,
                timestampSalida: null,
                valorTotal: null
            };

            vehiculosEnParqueo.push(nuevoVehiculo);
            renderVehiculos(); // Actualizar la tabla
            limpiarCampos(); // Limpiar campos después del ingreso
        });

        btnSalida.addEventListener('click', () => {
            const placaABuscar = numeroPlacaInput.value.trim().toUpperCase();

            if (!placaABuscar) {
                alert('Por favor, ingrese la placa del vehículo que va a salir.');
                return;
            }

            const vehiculoIndex = vehiculosEnParqueo.findIndex(v => v.placa === placaABuscar && !v.horaSalida);

            if (vehiculoIndex === -1) {
                alert(`No se encontró un vehículo con placa ${placaABuscar} o ya ha salido.`);
                return;
            }

            const vehiculo = vehiculosEnParqueo[vehiculoIndex];
            const now = new Date();
            const formatted = formatDateTime(now);

            vehiculo.horaSalida = formatted.time;
            vehiculo.timestampSalida = now;

            // Calcular tiempo y costo (ejemplo simple: horas completas)
            const tiempoEstacionadoMs = vehiculo.timestampSalreso - vehiculo.timestampIngreso;
            const tiempoEstacionadoHoras = Math.ceil(tiempoEstacionadoMs / (1000 * 60 * 60)); // Redondear hacia arriba
            vehiculo.valorTotal = tiempoEstacionadoHoras * vehiculo.valorHora;

            alert(`Vehículo ${vehiculo.placa} ha salido. Valor a pagar: $${vehiculo.valorTotal}.`);
            renderVehiculos(); // Volver a renderizar para actualizar la salida y el total
            limpiarCampos();
        });

        btnLimpiar.addEventListener('click', limpiarCampos);

        tipoVehiculoSelect.addEventListener('change', updateValorPorHora);

        btnHistorial.addEventListener('click', () => {
            alert('Funcionalidad de historial no implementada aún.');
            // Aquí podrías abrir una ventana modal o navegar a otra sección
            // para mostrar todos los vehículos (ingresados y salidos).
        });

        // --- Inicialización ---
        document.addEventListener('DOMContentLoaded', () => {
            updateDateTime();
            setInterval(updateDateTime, 1000); // Actualiza la fecha y hora cada segundo
            updateValorPorHora(); // Establecer el valor por hora inicial
            limpiarCampos(); // Asegurarse de que los campos estén limpios al cargar
        });


